import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'bemonad-footer',
  templateUrl: './bemonad-footer.component.html',
  styleUrls: ['./bemonad-footer.component.scss']
})
export class BemonadFooterComponent implements OnInit {
  public currentUser: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(currentUser => {      
      this.currentUser = currentUser;
    });
  }

  logout() {
    this.userService.logout();
  }
}
