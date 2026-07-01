import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Password } from 'primeng/password';
import { InputMask } from 'primeng/inputmask';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Slider } from 'primeng/slider';
import { Rating } from 'primeng/rating';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleButton } from 'primeng/togglebutton';
import { ColorPicker } from 'primeng/colorpicker';
import { AutoComplete } from 'primeng/autocomplete';
import { Knob } from 'primeng/knob';
import { GalleryCard } from './gallery-section';
/** Form & input components. */
let GalleryForm = class GalleryForm {
    text = '';
    num = 42;
    pass = '';
    masked = '';
    auto = '';
    toggle = true;
    slider = 60;
    rating = 3;
    color = '6366f1';
    checks = ['THR'];
    radio = 'THR';
    cities = [
        { name: 'تهران', code: 'THR' },
        { name: 'اصفهان', code: 'ISF' },
        { name: 'شیراز', code: 'SHZ' },
        { name: 'مشهد', code: 'MSH' },
    ];
    city = this.cities[0];
    multiCity = [this.cities[0]];
    sizes = [
        { label: 'S', value: 's' }, { label: 'M', value: 'm' }, { label: 'L', value: 'l' },
    ];
    size = 'm';
    filteredCities = signal([]);
    search(e) {
        const q = e.query.trim();
        this.filteredCities.set(this.cities.filter((c) => c.name.includes(q)));
    }
};
GalleryForm = __decorate([
    Component({
        selector: 'app-gallery-form',
        imports: [
            FormsModule, TranslocoModule, GalleryCard,
            InputTextModule, Textarea, InputNumber, Password, InputMask,
            InputGroupModule, InputGroupAddonModule, Select, MultiSelect, Checkbox,
            RadioButton, ToggleSwitch, Slider, Rating, SelectButton, ToggleButton,
            ColorPicker, AutoComplete, Knob,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <app-gallery-card title="InputText / Textarea">
        <input pInputText [(ngModel)]="text" placeholder="InputText" class="w-full" />
        <textarea pTextarea [(ngModel)]="text" rows="2" placeholder="Textarea" class="w-full"></textarea>
      </app-gallery-card>

      <app-gallery-card title="InputNumber">
        <p-inputnumber [(ngModel)]="num" mode="decimal" [showButtons]="true" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Password">
        <p-password [(ngModel)]="pass" [feedback]="true" [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full" />
      </app-gallery-card>

      <app-gallery-card title="InputMask" hint="(99) 999-9999">
        <p-inputmask [(ngModel)]="masked" mask="(99) 999-9999" placeholder="(98) 912-3456" styleClass="w-full" />
      </app-gallery-card>

      <app-gallery-card title="InputGroup">
        <p-inputgroup>
          <p-inputgroup-addon><i class="pi pi-user"></i></p-inputgroup-addon>
          <input pInputText placeholder="username" />
          <p-inputgroup-addon>&#64;</p-inputgroup-addon>
        </p-inputgroup>
      </app-gallery-card>

      <app-gallery-card title="AutoComplete">
        <p-autocomplete
          [(ngModel)]="auto"
          [suggestions]="filteredCities()"
          (completeMethod)="search($event)"
          [dropdown]="true"
          placeholder="city…"
          styleClass="w-full"
        />
      </app-gallery-card>

      <app-gallery-card title="Select">
        <p-select [options]="cities" [(ngModel)]="city" optionLabel="name" placeholder="select…" styleClass="w-full" />
      </app-gallery-card>

      <app-gallery-card title="MultiSelect">
        <p-multiselect [options]="cities" [(ngModel)]="multiCity" optionLabel="name" placeholder="select…" styleClass="w-full" [maxSelectedLabels]="2" />
      </app-gallery-card>

      <app-gallery-card title="SelectButton">
        <p-selectbutton [options]="sizes" [(ngModel)]="size" optionLabel="label" optionValue="value" [allowEmpty]="false" />
      </app-gallery-card>

      <app-gallery-card title="Checkbox">
        <div class="flex flex-col gap-2">
          @for (c of cities; track c.code) {
            <label class="flex items-center gap-2 text-sm">
              <p-checkbox [(ngModel)]="checks" [value]="c.code" [inputId]="c.code" />
              {{ c.name }}
            </label>
          }
        </div>
      </app-gallery-card>

      <app-gallery-card title="RadioButton">
        <div class="flex flex-col gap-2">
          @for (c of cities; track c.code) {
            <label class="flex items-center gap-2 text-sm">
              <p-radiobutton [(ngModel)]="radio" [value]="c.code" [inputId]="'r-' + c.code" name="r" />
              {{ c.name }}
            </label>
          }
        </div>
      </app-gallery-card>

      <app-gallery-card title="ToggleSwitch / ToggleButton">
        <p-toggleswitch [(ngModel)]="toggle" />
        <p-togglebutton [(ngModel)]="toggle" onLabel="On" offLabel="Off" />
      </app-gallery-card>

      <app-gallery-card title="Slider">
        <div class="w-full pt-2">
          <p-slider [(ngModel)]="slider" class="w-full" />
          <div class="mt-2 text-xs text-muted-color">{{ slider }}</div>
        </div>
      </app-gallery-card>

      <app-gallery-card title="Knob">
        <p-knob [(ngModel)]="num" [size]="90" valueTemplate="{value}%" />
      </app-gallery-card>

      <app-gallery-card title="Rating">
        <p-rating [(ngModel)]="rating" />
      </app-gallery-card>

      <app-gallery-card title="ColorPicker">
        <p-colorpicker [(ngModel)]="color" />
        <span class="text-xs text-muted-color" dir="ltr">{{ color }}</span>
      </app-gallery-card>
    </div>
  `,
    })
], GalleryForm);
export { GalleryForm };
