export interface ApiResponse {
    statusCode: number;
    content:    Location[];
    dateTime:   Date;
}

export interface ViTri {
    id:        number;
    tenViTri:  string;
    tinhThanh: string;
    quocGia:   string;
    hinhAnh:   string;
}
