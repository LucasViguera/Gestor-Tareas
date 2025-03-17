import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // importa RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]  // Asegúrate de importar RouterModule
})
export class AppComponent {
  title = 'my-angular-app';
}
