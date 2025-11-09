import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AlcaldeComponent } from './entregas/alcalde/component/alcaldeComponent/alcaldeComponent';
import { AlcanyizComponent } from './entregas/alcanyiz/component/alcanyizComponent/alcanyizComponent';
import { AlfonsoComponent } from './entregas/alfonso/component/alfonsoComponent/alfonsoComponent';
import { CalinescuComponent } from './entregas/calinescu/component/calinescuComponent/calinescuComponent';
import { CastanyeraComponent } from './entregas/castanyera/component/castanyeraComponent/castanyeraComponent';
import { ContrerasComponent } from './entregas/contreras/component/contrerasComponent/contrerasComponent';
import { FernandezComponent } from './entregas/fernandez/component/fernandezComponent/fernandezComponent';
import { GarciaComponent } from './entregas/garcia/component/garciaComponent/garciaComponent';
import { PallasComponent } from './entregas/pallas/component/pallasComponent/pallasComponent';
import { PalomaresComponent } from './entregas/palomares/component/palomaresComponent/palomaresComponent';
import { PavonComponent } from './entregas/pavon/component/pavonComponent/pavonComponent';
import { ReynaComponent } from './entregas/reyna/component/reynaComponent/reynaComponent';
import { SalinasComponent } from './entregas/salinas/component/salinasComponent/salinasComponent';
import { SemperteguiComponent } from './entregas/sempertegui/component/semperteguiComponent/semperteguiComponent';
import { SilvestreComponent } from './entregas/silvestre/component/silvestreComponent/silvestreComponent';
import { SoaresComponent } from './entregas/soares/component/soaresComponent/soaresComponent';
import { UskiComponent } from './entregas/uski/component/uskiComponent/uskiComponent';
import { ZanonComponent } from './entregas/zanon/component/zanonComponent/zanonComponent';
import { HomePageComponent } from './entregas/sempertegui/component/homePageComponent/homePageComponent';
import { CatalogPageComponent } from './entregas/sempertegui/component/catalogPageComponent/catalogPageComponent';
import { ProductPageComponent } from './entregas/sempertegui/component/productPageComponent/productPageComponent';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'alcalde', component: AlcaldeComponent },
    { path: 'alcanyiz', component: AlcanyizComponent },
    { path: 'alfonso', component: AlfonsoComponent },
    { path: 'calinescu', component: CalinescuComponent },
    { path: 'castanyera', component: CastanyeraComponent },
    { path: 'contreras', component: ContrerasComponent },
    { path: 'fernandez', component: FernandezComponent },
    { path: 'garcia', component: GarciaComponent },
    { path: 'pallas', component: PallasComponent },
    { path: 'palomares', component: PalomaresComponent },
    { path: 'pavon', component: PavonComponent },
    { path: 'reyna', component: ReynaComponent },
    { path: 'salinas', component: SalinasComponent },
    { path: 'sempertegui', component: SemperteguiComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'home', component: HomePageComponent },
            { path: 'catalog', component: CatalogPageComponent },
            { path: 'catalog/:id', component: ProductPageComponent }
        ],
    },
    { path: 'silvestre', component: SilvestreComponent },
    { path: 'soares', component: SoaresComponent },
    { path: 'uski', component: UskiComponent },
    { path: 'zanon', component: ZanonComponent },
];
