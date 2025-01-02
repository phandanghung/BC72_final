import { ApiResponse } from "../../../interfaces/api.interface";
import { ListRoom } from "../../../interfaces/room.interface";
import fetcher from "../../fetcher";

export const RoomApi = {
    getlistRoom: async(pageIndex:number = 1,pageSize:number = 10, keyWord: string):Promise<ListRoom> => {
        try {
            const response = await fetcher.get<ApiResponse<ListRoom>>(
                `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyWord}`
            )
            return response.data.content;
        } catch (error) {
            throw error
        }
    },
    deleteRoom: async(id:number): Promise<any> =>{
        try {
            const response = await fetcher.delete<any>(
                `/phong-thue/${id}`
            )
            console.log('rs',response.data.content)
            return response.data.content;
        } catch (error) {
            throw error
        }
    },     
    addRoom: async(id:number): Promise<any> =>{
        try {
            const response = await fetcher.post<any>(
                `/phong-thue/${id}`
            )
            return response.data.content;
        } catch (error) {
            throw error
        }
    },
}