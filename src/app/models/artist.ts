import {Track} from './tracks'
import {Currency} from './currency';
export class Artist {
    id: number;
    name: string;
    sort_name : string;
    gender    : string ='';
    description : string;
    content : string;
    avatar : string = '';
    avatarFile : File;
    area : string;
    type : string = '';
    slug: string;
    begin_date : string;
    end_date : string;
    date_of_birth : string;
    status: boolean;
    created_at: string;
    updated_at: string;
    error : false;
    bio: string;
    tracks : Track[];
    play   : boolean = false;
    public_thumb : string = '';
    prices : Currency[] = null;

}