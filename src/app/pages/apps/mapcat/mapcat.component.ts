import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-mapcat',
  templateUrl: './mapcat.component.html',
  styleUrls: ['./mapcat.component.scss'],
})
export class MapcatComponent implements OnInit {
  constructor(private Auth: AuthService) {}

  ngOnInit(): void {}
}
