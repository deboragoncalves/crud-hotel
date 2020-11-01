import { Hospede } from '../person/hospede';

export class Checkin {
    hospede: Hospede;
    id: number;
    dataEntrada: string;
    dataSaida: string;
    adicionalVeiculo: boolean;
}
