import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type { AboutPayload, AboutResponse } from "@/types/academy/about";
import type { HeroPayload, HeroResponse } from "@/types/academy/hero";
import type {
  MainSettingsPayload,
  MainSettingsResponse,
} from "@/types/academy/main-settings";
import type { SubDomainResponse } from "@/types/subdomain";

export const academyApi = {
  getMainSettings: async (): Promise<MainSettingsResponse> => {
    const response = await api.get("/settings/academy");
    return response.data;
  },
  updateMainSetting: async (
    data: MainSettingsPayload
  ): Promise<MainSettingsResponse> => {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.put("/settings/academy", formData, {
      headers: {
        "Content-Type": "form-data",
      },
    });
    return response.data;
  },
  getHero: async (): Promise<HeroResponse> => {
    const response = await api.get("/academy/hero");
    return response.data;
  },
  updateHero: async (data: HeroPayload): Promise<HeroResponse> => {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.put("/academy/hero", formData, {
      headers: {
        "Content-Type": "form-data",
      },
    });
    return response.data;
  },
  getAbout: async (): Promise<AboutResponse> => {
    const response = await api.get("/academy/about");
    return response.data;
  },
  updateAbout: async (data: AboutPayload): Promise<AboutResponse> => {
    const formData = new FormData();
    appendFormData(formData, {
      ...data,
    });
    const response = await api.put("/academy/about", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  checkSubdomain: async (subdomain: string): Promise<SubDomainResponse> => {
    const response = await api.get(
      `/settings/check-subdomain/${encodeURIComponent(subdomain)}`
    );
    return response.data;
  },
};
