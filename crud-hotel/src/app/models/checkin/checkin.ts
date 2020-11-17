import { Guest } from '../guest/guest';

export class Checkin {
    guest: Guest;
    id: number;
    dateIn: string;
    dateOut: string;
    plusCar: boolean;
}
