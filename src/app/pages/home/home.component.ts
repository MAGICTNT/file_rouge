import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../utils/services/users/users.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // ----- Propriétés -----

  text: string = ""


  // ----- Constructeur -----

  constructor(private usersService: UsersService) {}


  // ----- Méthodes -----

  ngOnInit(): void {
    // this.usersService.doHello().subscribe({
    //   next: (res) => {
    //     this.text = res
    //   },
    //   error: (err) => {
    //     console.log("Error " +  JSON.stringify(err))
    //   }
    // });
  }


}
