import { ApiResponse } from "../../interfaces/api.interface";
import { ViTri } from "../../interfaces/location.interface";
import fetcher from "../fetcher";

const locationApi = {
    getLocation: async (): Promise<ViTri[]> => { 
        try {
            const response = await fetcher.get<ApiResponse<ViTri[]>>(
                `/vi-tri`
            );
            return response.data.content;
        } catch (error) {
            throw error;
        }
    },
    
};

export default locationApi;