export interface Post {
  title:string,
  permaLink:string;
  category:{
    categoryId:string,
    category:String
  },
  postImg:string,
  excerpt:string,
  content:string,
  isFeatured:boolean,
  views:number,
  status:string,
  createdAt:number
}
