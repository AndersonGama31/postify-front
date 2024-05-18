/* eslint-disable prettier/prettier */

export class Formatters {


    static formatDate(date: string) {
        const formattedDate = new Date(date).toLocaleDateString('pt-BR');
        return formattedDate;
    }
}
