import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [ ],
  template: `
  <h3>Contenido</h3>
  <ul>
    <li>Spinner global en Interceptores</li>
    <li>Store estado global simple con signals y servicio</li>
    <li>Arquitectura Scalfolding-documentacion</li>
    <li>Arrancar "json-serve" abrir nuevo terminal y ejecutar > npm run serve:api</li>
  </ul>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
