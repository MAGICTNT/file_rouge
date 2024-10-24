import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../utils/services/users/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  text: string = ""

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.doHello().subscribe({
      next: (res) => {
        this.text = res
      },
      error: (err) => {
        console.log("Error " +  JSON.stringify(err))
      }
    });
  }
}
