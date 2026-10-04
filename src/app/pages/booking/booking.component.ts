import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChamberService } from '../../services/chamber.service';
import { CepService } from '../../services/cep.service';
import { Chamber } from '../../models/chamber.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <section class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard bg-brutalist-grid">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-tetra-slate-light border border-tetra-border text-xs font-mono uppercase text-tetra-solar mb-3">
          <span class="w-2 h-2 bg-tetra-solar"></span>
          PROTOCOLO DE CONVOCAÇÃO RITUALÍSTICA
        </div>

        <h1 class="font-grotesk text-3xl sm:text-4xl font-bold uppercase tracking-tight text-tetra-parchment mb-2">
          INICIAÇÃO & RESERVA DE CÂMARA
        </h1>

        <p class="font-mono text-xs text-tetra-muted max-w-2xl leading-relaxed">
          Preencha o manifesto de convocação para submeter sua equipe ao julgamento da Horologia. 
          Informe o CEP do santuário/líder para consulta oracular instantânea.
        </p>
      </section>

      @if (bookingConfirmed()) {
        <!-- Ritual Confirmation Screen -->
        <section class="bg-tetra-slate border-2 border-tetra-emerald p-8 shadow-hard text-center space-y-5">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-tetra-emerald/20 border-2 border-tetra-emerald text-tetra-emerald text-3xl font-mono">
            ✓
          </div>

          <h2 class="font-grotesk text-2xl font-bold uppercase text-tetra-parchment">
            CONVOCAÇÃO REGISTRADA COM SUCESSO
          </h2>

          <div class="bg-tetra-slate-light border border-tetra-border p-5 max-w-lg mx-auto text-left font-mono text-xs space-y-2">
            <div><strong class="text-tetra-solar">PROTOCOLO Nº:</strong> #TC-{{ confirmationCode() }}</div>
            <div><strong class="text-tetra-muted">LÍDER INICIADO:</strong> {{ bookingForm.value.initiateName }}</div>
            <div><strong class="text-tetra-muted">SANTUÁRIO / CÂMARA:</strong> {{ selectedChamber()?.name }}</div>
            <div><strong class="text-tetra-muted">DATA & HORÁRIO:</strong> {{ bookingForm.value.ritualDate }} às {{ bookingForm.value.timeSlot }}</div>
            <div><strong class="text-tetra-muted">CONTINGENTE:</strong> {{ bookingForm.value.partySize }} súditos</div>
            <div><strong class="text-tetra-muted">LOCALIDADE VALIDADE (CEP):</strong> {{ bookingForm.value.city }} - {{ bookingForm.value.state }}</div>
            
            @if (appliedDiscount() > 0) {
              <div class="text-tetra-emerald font-bold">
                ★ DESCONTO TETRACROMA APLICADO: -{{ appliedDiscount() }}%
              </div>
            }

            <div class="border-t border-tetra-border pt-2 text-sm">
              <strong class="text-tetra-solar">TRIBUTO TOTAL:</strong> R$ {{ finalPrice().toFixed(2) }}
            </div>
          </div>

          <p class="font-mono text-xs text-tetra-muted max-w-md mx-auto">
            Uma cópia criptografada deste manifesto foi enviada para <strong>{{ bookingForm.value.email }}</strong>. Apresente-se no horário sem atrasos.
          </p>

          <div class="flex justify-center gap-4 pt-4">
            <button
              type="button"
              (click)="resetBooking()"
              class="px-5 py-2.5 bg-tetra-solar text-tetra-graphite font-mono text-xs uppercase font-bold btn-brutalist shadow-hard-sm"
            >
              NOVA CONVOCAÇÃO
            </button>
            <a
              routerLink="/camaras"
              class="px-5 py-2.5 border border-tetra-border text-tetra-parchment font-mono text-xs uppercase hover:border-tetra-solar"
            >
              RETORNAR ÀS CÂMARAS
            </a>
          </div>
        </section>
      } @else {

        <!-- Booking Reactive Form -->
        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard space-y-6">
          
          <!-- Chamber Selection -->
          <div>
            <label for="chamber-select" class="block text-xs font-mono uppercase text-tetra-solar mb-1 font-bold">
              [ 1. SELECIONE A CÂMARA DE PROVAÇÃO * ]
            </label>
            <select
              id="chamber-select"
              formControlName="chamberId"
              class="w-full px-3 py-2.5 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
              [class.border-tetra-carmine]="isFieldInvalid('chamberId')"
            >
              <option value="" disabled>-- ESCOLHA UMA CÂMARA --</option>
              @for (chamber of chamberService.chambers(); track chamber.id) {
                <option [value]="chamber.id">
                  {{ chamber.code }} // {{ chamber.name }} - R$ {{ chamber.pricePerInitiate.toFixed(2) }}
                </option>
              }
            </select>
            @if (isFieldInvalid('chamberId')) {
              <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                * A seleção de uma câmara é mandatória.
              </span>
            }
          </div>

          <!-- Initiator Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="initiate-name" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                NOME DO SÚDITO LÍDER *
              </label>
              <input
                id="initiate-name"
                type="text"
                formControlName="initiateName"
                placeholder="Ex: Marcus de Tetrachroma"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('initiateName')"
              />
              @if (isFieldInvalid('initiateName')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * Mínimo de 3 caracteres obrigatório.
                </span>
              }
            </div>

            <div>
              <label for="initiate-email" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                E-MAIL PARA TRANSMISSÃO *
              </label>
              <input
                id="initiate-email"
                type="email"
                formControlName="email"
                placeholder="iniciado@ordem.org"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('email')"
              />
              @if (isFieldInvalid('email')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * Informe um endereço de e-mail válido.
                </span>
              }
            </div>

            <div>
              <label for="initiate-phone" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                COMUNICADOR / TELEFONE *
              </label>
              <input
                id="initiate-phone"
                type="text"
                formControlName="phone"
                placeholder="(00) 90000-0000"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('phone')"
              />
              @if (isFieldInvalid('phone')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * Telefone de contato obrigatório.
                </span>
              }
            </div>

            <div>
              <label for="party-size" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                TAMANHO DA EQUIPE (2 A 8 INICIADOS) *
              </label>
              <input
                id="party-size"
                type="number"
                min="2"
                max="8"
                formControlName="partySize"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('partySize')"
              />
              @if (isFieldInvalid('partySize')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * O contingente deve ter entre 2 e 8 membros.
                </span>
              }
            </div>
          </div>

          <!-- Date & Time Slot -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="ritual-date" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                DATA DO RITO *
              </label>
              <input
                id="ritual-date"
                type="date"
                formControlName="ritualDate"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('ritualDate')"
              />
              @if (isFieldInvalid('ritualDate')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * Data do rito é obrigatória.
                </span>
              }
            </div>

            <div>
              <label for="time-slot" class="block text-xs font-mono uppercase text-tetra-muted mb-1">
                TURNO DA HOROLOGIA *
              </label>
              <select
                id="time-slot"
                formControlName="timeSlot"
                class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                [class.border-tetra-carmine]="isFieldInvalid('timeSlot')"
              >
                <option value="" disabled>-- SELECIONE O HORÁRIO --</option>
                <option value="14:00">14:00 - ABERTURA DOS PORTÕES</option>
                <option value="16:00">16:00 - JULGAMENTO DA TARDE</option>
                <option value="18:30">18:30 - CREPÚSCULO DE COBALTO</option>
                <option value="20:30">20:30 - VIGÍLIA DA QUARTA COR</option>
              </select>
              @if (isFieldInvalid('timeSlot')) {
                <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                  * Escolha o turno da prova.
                </span>
              }
            </div>
          </div>

          <!-- ViaCEP Public API Section -->
          <div class="p-4 bg-tetra-slate-light border border-tetra-border space-y-4">
            <div class="flex items-center justify-between border-b border-tetra-border pb-2">
              <span class="text-xs font-mono uppercase text-tetra-cobalt-light font-bold flex items-center gap-2">
                <span class="w-2 h-2 bg-tetra-cobalt"></span>
                LOCALIZAÇÃO DO SANTUÁRIO // CONSULTA VIACEP
              </span>
              <span class="text-[10px] font-mono text-tetra-muted">API PÚBLICA INTEGRADA</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label for="cep-input" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
                  CEP (8 DÍGITOS) *
                </label>
                <div class="flex gap-2">
                  <input
                    id="cep-input"
                    type="text"
                    formControlName="cep"
                    placeholder="01001000"
                    maxlength="9"
                    (blur)="onCepBlur()"
                    class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-cobalt rounded-none"
                    [class.border-tetra-carmine]="isFieldInvalid('cep')"
                  />
                  <button
                    type="button"
                    (click)="onCepBlur()"
                    [disabled]="isSearchingCep()"
                    class="px-3 py-2 bg-tetra-cobalt text-white font-mono text-xs uppercase font-bold hover:bg-tetra-cobalt-light btn-brutalist disabled:opacity-50"
                  >
                    @if (isSearchingCep()) {
                      ...
                    } @else {
                      BUSCAR
                    }
                  </button>
                </div>
                @if (cepError()) {
                  <span class="block text-[10px] font-mono text-tetra-carmine mt-1">
                    {{ cepError() }}
                  </span>
                }
              </div>

              <div class="sm:col-span-2">
                <label for="address-input" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
                  LOGRADOURO / ENDEREÇO *
                </label>
                <input
                  id="address-input"
                  type="text"
                  formControlName="address"
                  placeholder="Preenchido automaticamente pelo CEP..."
                  class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
                  [class.border-tetra-carmine]="isFieldInvalid('address')"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="city-input" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
                  CIDADE *
                </label>
                <input
                  id="city-input"
                  type="text"
                  formControlName="city"
                  placeholder="Cidade"
                  class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs rounded-none"
                />
              </div>

              <div>
                <label for="state-input" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
                  ESTADO (UF) *
                </label>
                <input
                  id="state-input"
                  type="text"
                  formControlName="state"
                  placeholder="UF"
                  class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs rounded-none"
                />
              </div>
            </div>
          </div>

          <!-- ARG Code Discount Input -->
          <div class="p-4 bg-tetra-slate-light border border-tetra-border space-y-3">
            <label for="arg-code" class="block text-xs font-mono uppercase text-tetra-emerald font-bold">
              [ POSSUI CÓDIGO ARG DESTRANCADO? ]
            </label>
            <div class="flex gap-2">
              <input
                id="arg-code"
                type="text"
                formControlName="argCode"
                placeholder="Ex: TETRA-V4, CELL44, LOYAL7..."
                class="flex-1 px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs uppercase focus:outline-none focus:border-tetra-emerald rounded-none"
              />
              <button
                type="button"
                (click)="applyArgDiscount()"
                class="px-4 py-2 bg-tetra-emerald text-tetra-graphite font-mono text-xs uppercase font-bold hover:bg-emerald-400 btn-brutalist"
              >
                VALIDAR CÓDIGO
              </button>
            </div>

            @if (argFeedback()) {
              <p 
                class="font-mono text-xs"
                [class.text-tetra-emerald]="appliedDiscount() > 0"
                [class.text-tetra-carmine]="appliedDiscount() === 0"
              >
                {{ argFeedback() }}
              </p>
            }
          </div>

          <!-- Price Summary & Submission Bar -->
          <div class="border-t border-tetra-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span class="block text-[10px] font-mono uppercase text-tetra-muted">TRIBUTO FINAL CALCULADO</span>
              <div class="flex items-baseline gap-2">
                <span class="font-grotesk text-3xl font-bold text-tetra-solar">
                  R$ {{ finalPrice().toFixed(2) }}
                </span>
                @if (appliedDiscount() > 0) {
                  <span class="font-mono text-xs text-tetra-emerald uppercase font-bold">
                    (-{{ appliedDiscount() }}% ARG APLICADO)
                  </span>
                }
              </div>
            </div>

            <!-- Submit Button Strictly Disabled While Form is Invalid -->
            <button
              type="submit"
              [disabled]="bookingForm.invalid || isSubmitting()"
              class="w-full sm:w-auto px-8 py-3.5 bg-tetra-solar text-tetra-graphite font-mono text-xs uppercase font-bold hover:bg-tetra-solar-hover border border-tetra-solar btn-brutalist shadow-hard disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              @if (isSubmitting()) {
                ENVIANDO MANIFESTO...
              } @else {
                CONFIRMAR RITO DE INICIAÇÃO &rarr;
              }
            </button>
          </div>

          @if (bookingForm.invalid) {
            <p class="text-[10px] font-mono text-tetra-muted text-right">
              * Preencha todos os campos obrigatórios e consulte o CEP para habilitar o envio do manifesto.
            </p>
          }

        </form>
      }

    </div>
  `
})
export class BookingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  readonly chamberService = inject(ChamberService);
  private readonly cepService = inject(CepService);

  // Signals
  readonly isSearchingCep = signal<boolean>(false);
  readonly cepError = signal<string | null>(null);
  readonly isSubmitting = signal<boolean>(false);
  readonly bookingConfirmed = signal<boolean>(false);
  readonly confirmationCode = signal<string>('');
  readonly appliedDiscount = signal<number>(0);
  readonly argFeedback = signal<string | null>(null);

  // Formulário Reativo
  readonly bookingForm = this.fb.group({
    chamberId: ['', [Validators.required]],
    initiateName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    partySize: [4, [Validators.required, Validators.min(2), Validators.max(8)]],
    ritualDate: ['', [Validators.required]],
    timeSlot: ['', [Validators.required]],
    cep: ['', [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$|^[0-9]{8}$/)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    argCode: ['']
  });

  // Computed: Câmara selecionada
  readonly selectedChamber = computed(() => {
    const id = Number(this.bookingForm.get('chamberId')?.value);
    if (!id) return null;
    return this.chamberService.chambers().find(c => c.id === id) ?? null;
  });

  // Computed: Cálculo do Tributo Final (Preço * Pessoas - Desconto ARG)
  readonly finalPrice = computed(() => {
    const chamber = this.selectedChamber();
    const size = Number(this.bookingForm.get('partySize')?.value) || 1;
    if (!chamber) return 0;

    const base = chamber.pricePerInitiate * size;
    const discount = this.appliedDiscount();
    return discount > 0 ? base * (1 - discount / 100) : base;
  });

  ngOnInit(): void {
    if (this.chamberService.chambers().length === 0) {
      this.chamberService.loadChambers();
    }

    // Captura parâmetros de rota (ex: /iniciar?chamberId=3&code=CELL44)
    this.route.queryParams.subscribe(params => {
      if (params['chamberId']) {
        this.bookingForm.patchValue({ chamberId: params['chamberId'] });
      }
      if (params['code']) {
        this.bookingForm.patchValue({ argCode: params['code'] });
        this.applyArgDiscount();
      }
    });

    // Se o valor de chamberId mudar no form, reaplica o desconto se houver
    this.bookingForm.get('chamberId')?.valueChanges.subscribe(() => {
      this.applyArgDiscount();
    });
    this.bookingForm.get('partySize')?.valueChanges.subscribe(() => {
      // triggers computed
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.bookingForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onCepBlur(): void {
    const rawCep = this.bookingForm.get('cep')?.value;
    if (!rawCep) return;

    const cleanCep = rawCep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      this.cepError.set('O CEP deve conter 8 dígitos.');
      return;
    }

    this.isSearchingCep.set(true);
    this.cepError.set(null);

    this.cepService.buscarCep(cleanCep).subscribe({
      next: res => {
        this.bookingForm.patchValue({
          address: `${res.logradouro} ${res.bairro ? '- ' + res.bairro : ''}`,
          city: res.localidade,
          state: res.uf
        });
        this.isSearchingCep.set(false);
      },
      error: err => {
        this.cepError.set(err.message || 'Santuário não localizado para este CEP.');
        this.isSearchingCep.set(false);
      }
    });
  }

  applyArgDiscount(): void {
    const code = (this.bookingForm.get('argCode')?.value || '').trim().toUpperCase();
    if (!code) {
      this.appliedDiscount.set(0);
      this.argFeedback.set(null);
      return;
    }

    const chamber = this.selectedChamber();
    const isUnlockedInSession = this.chamberService.unlockedSecrets().includes(code);

    if (code === 'TETRA-V4' || code === chamber?.argSecretCode.toUpperCase() || isUnlockedInSession) {
      const discount = chamber ? chamber.argDiscountPercent : 20;
      this.appliedDiscount.set(discount);
      this.argFeedback.set(`[SUCESSO] Código "${code}" autenticado! Concedido ${discount}% de desconto.`);
      this.chamberService.unlockSecret(code);
    } else {
      this.appliedDiscount.set(0);
      this.argFeedback.set(`[INVÁLIDO] O código "${code}" não pertence aos registros decodificados.`);
    }
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simula transmissão ritualística
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.confirmationCode.set(Math.random().toString(36).substring(2, 8).toUpperCase());
      this.bookingConfirmed.set(true);
    }, 900);
  }

  resetBooking(): void {
    this.bookingForm.reset({
      partySize: 4,
      chamberId: '',
      ritualDate: '',
      timeSlot: ''
    });
    this.appliedDiscount.set(0);
    this.argFeedback.set(null);
    this.bookingConfirmed.set(false);
  }
}
