import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    constructor(){}
    
    public hostname = 'http://54.244.59.11:8080/apis';
    // private hostname = 'hostname';

    public getHost(){
        return this.hostname;
    }
}