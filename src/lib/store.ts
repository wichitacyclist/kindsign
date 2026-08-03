"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createDesign, createLocation } from "./defaults";
import { getTemplate } from "./templates";
import type {
  DropOffLocation,
  PrinterPresetId,
  SignDesign,
  TemplateId,
} from "./types";

type EditorStep = "template" | "customize" | "preview" | "export";

interface EditorState {
  design: SignDesign;
  step: EditorStep;
  printerPresetId: PrinterPresetId;
  gallery: SignDesign[];
  setStep: (step: EditorStep) => void;
  setPrinterPreset: (id: PrinterPresetId) => void;
  applyTemplate: (templateId: TemplateId) => void;
  updateDesign: (patch: Partial<SignDesign>) => void;
  setLocations: (locations: DropOffLocation[]) => void;
  addLocation: () => void;
  updateLocation: (id: string, patch: Partial<DropOffLocation>) => void;
  removeLocation: (id: string) => void;
  loadDesign: (design: SignDesign) => void;
  duplicateDesign: () => SignDesign;
  publishToGallery: (meta: { title: string; authorName: string }) => void;
  forkFromGallery: (id: string) => void;
  rateDesign: (id: string, rating: number) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      design: createDesign("community"),
      step: "template",
      printerPresetId: "custom",
      gallery: [],
      setStep: (step) => set({ step }),
      setPrinterPreset: (printerPresetId) => set({ printerPresetId }),
      applyTemplate: (templateId) => {
        const template = getTemplate(templateId);
        const current = get().design;
        set({
          design: {
            ...current,
            ...template.defaults,
            templateId,
            id: current.id,
            locations: current.locations,
            updatedAt: new Date().toISOString(),
          },
          step: "customize",
        });
      },
      updateDesign: (patch) =>
        set({
          design: {
            ...get().design,
            ...patch,
            updatedAt: new Date().toISOString(),
          },
        }),
      setLocations: (locations) =>
        set({
          design: {
            ...get().design,
            locations,
            updatedAt: new Date().toISOString(),
          },
        }),
      addLocation: () => {
        const design = get().design;
        set({
          design: {
            ...design,
            locations: [...design.locations, createLocation({ name: `Drop-off ${design.locations.length + 1}` })],
            updatedAt: new Date().toISOString(),
          },
        });
      },
      updateLocation: (id, patch) => {
        const design = get().design;
        set({
          design: {
            ...design,
            locations: design.locations.map((l) =>
              l.id === id ? { ...l, ...patch } : l
            ),
            updatedAt: new Date().toISOString(),
          },
        });
      },
      removeLocation: (id) => {
        const design = get().design;
        if (design.locations.length <= 1) return;
        set({
          design: {
            ...design,
            locations: design.locations.filter((l) => l.id !== id),
            updatedAt: new Date().toISOString(),
          },
        });
      },
      loadDesign: (design) => set({ design, step: "customize" }),
      duplicateDesign: () => {
        const copy: SignDesign = {
          ...get().design,
          id: crypto.randomUUID().slice(0, 10),
          title: undefined,
          published: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          forks: 0,
          rating: undefined,
        };
        set({ design: copy, step: "customize" });
        return copy;
      },
      publishToGallery: ({ title, authorName }) => {
        const design = {
          ...get().design,
          title,
          authorName,
          published: true,
          rating: get().design.rating ?? 5,
          forks: get().design.forks ?? 0,
          updatedAt: new Date().toISOString(),
        };
        const gallery = [design, ...get().gallery.filter((g) => g.id !== design.id)];
        set({ design, gallery });
      },
      forkFromGallery: (id) => {
        const source = get().gallery.find((g) => g.id === id);
        if (!source) return;
        const forked: SignDesign = {
          ...source,
          id: crypto.randomUUID().slice(0, 10),
          published: false,
          title: `${source.title ?? source.templateId} (fork)`,
          forks: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const gallery = get().gallery.map((g) =>
          g.id === id ? { ...g, forks: (g.forks ?? 0) + 1 } : g
        );
        set({ design: forked, gallery, step: "customize" });
      },
      rateDesign: (id, rating) => {
        set({
          gallery: get().gallery.map((g) =>
            g.id === id ? { ...g, rating } : g
          ),
        });
      },
      reset: () => set({ design: createDesign("community"), step: "template" }),
    }),
    {
      name: "kindsign-editor-v1",
      partialize: (s) => ({
        design: s.design,
        gallery: s.gallery,
        printerPresetId: s.printerPresetId,
      }),
    }
  )
);
