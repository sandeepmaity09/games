import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared/index';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public users;
    constructor(private userService:UserService) {}

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers(){
        this.userService.getAllUsers().subscribe(data=>{
            console.log(data);
            this.users = data;
            return data;
        },err=>{
            console.log(err);
        });
    }
    
    deleteUser(id){
        this.userService.deleteUser(id).subscribe(data=>{
            console.log(data);
            this.getAllUsers();
        })
    }
}
