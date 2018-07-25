export class Track {
    id: number;
    name: string;
    artist_id: number = 0;
    artist_name: string;
    description: string;
    thumb: string = "";
    path: string = "";
    thumbFile: File;
    pathFile: File;
    slug: string;
    day_of_creation: string;
    status: number = 0;
    version: string;
    price: number;
    created_at: string;
    updated_at: string;
    error: false;
    play: boolean = false;
    public_thumb: any = '';
    public_path: any = '';
    extension: string = '';
   
}