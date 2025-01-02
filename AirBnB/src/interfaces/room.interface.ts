export interface Root {
    statusCode: number
    content: ListRoom
    dateTime: string
  }
  
  export interface ListRoom {
    pageIndex: number
    pageSize: number
    totalRow: number
    keywords: any
    data: Room[]
  }
  
  export interface Room {
    id: number
    tenPhong: string
    khach: number
    phongNgu: number
    giuong: number
    phongTam: number
    moTa: string
    giaTien: number
    mayGiat: boolean
    banLa: boolean
    tivi: boolean
    dieuHoa: boolean
    wifi: boolean
    bep: boolean
    doXe: boolean
    hoBoi: boolean
    banUi: boolean
    maViTri: number
    hinhAnh: string
  }
  