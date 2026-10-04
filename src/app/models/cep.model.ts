export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface BookingPayload {
  chamberId: number;
  chamberName: string;
  initiateName: string;
  email: string;
  phone: string;
  partySize: number;
  ritualDate: string;
  timeSlot: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  argDiscountCode?: string;
  totalPrice: number;
}
