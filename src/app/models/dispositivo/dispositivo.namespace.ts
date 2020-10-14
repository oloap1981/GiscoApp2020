
export namespace Dispositivo {

    export class Dispositivo {
        public url_icona_tipologia: string;
        public autorizzazione_scadenza: string;
        public dispositivi_key: number;
        public tab_tipo_dispositivo_cod: number;
        public dis_azienda_key: number;
        public dis_titolo: string;
        public dis_data_attivazione: string;
        public dis_data_disattivazione: string;
        public dis_baricentro_n: number;
        public dis_baricentro_e: number;
        public dis_gestore_desc: string;
        public tab_tipo_dispositivo_desc: string;
        public az_ragione_sociale: string;
        public az_codice_interno: string;
        public tab_comune_desc: string;
        public gr_ragione_sociale: string;
        public dis_intervento_key: number;
        public dis_gestore_key: number;
        public dis_descrizione: string;
        public dis_operativo: string;
        public dis_autorizzazione: string;
        public dis_dispositivo_key: number;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public az_codice_commessa: any;
        public dis_cliente_desc: string;
        // dis_azienda: attributi sono tutti null
        // public dis_autorizzazioni: [ ],
        public dis_codice_prevalente: string;
        public dis_autorizzazione_vigente: number;
        public dis_autorizzazione_scadenza: string;
        public dis_autorizzazione_filter: string;
        public attivita_situazione: Dispositivo.AttivitaSituazione;
        public attivita_situazione_order: number;
    }

    export class AttivitaSituazione {
        public dis_azienda_key: number;
        public dispositivi_key: number;
        public dis_data_attivazione: string;
        public dis_autorizzazione: string;
        public dis_operativo: string;
        public att_concluse: number;
        public att_scadute: number;
        public att_prossime: number;
        public att_future: number;
        public att_altre: number;
        public att_tutte: number;
        public att_prescrizioni: number;
    }

    export class Titolarita {
        public disp_titolarita_key: number;
        public dis_dispositivo_key: number;
        public dis_responsabile_key: number;
        public dis_proprietario_key: number;
        public dis_da_data: string;
        public dis_a_data: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public dp_nominativo: string;
        public di_ragione_sociale: string;
    }

    export class Autorizzazioni {
        public disp_autorizzazioni_key: number;
        public dis_dispositivo_key: number;
        public dp_documento_key: number;
        public dp_emissione_numero: number;
        public dp_emissione_data: string;
        public dp_scadenza_data: string;
        public ec_nominativo: string;
        public tab_tipologia_autorizzazioni_desc: string;
        public doc_titolo: string;
    }

    export class Personalizzazione {
        public dis_valori: Array<PersonalizzazioneValore>;
        public dis_valore: string;
        public tab_tipo_dispositivo_cod: number;
        public dis_scheda_testo: string;
        public dis_tipo_campo: string;
        public dis_order: number;
        public dis_dispositivo_key: number;
        public dis_valore_d: string;
        public dis_valore_n: number;
        public dis_valore_t: any;
    }

    export class PersonalizzazioneValore {
        public dis_valore_scelto: string;
        public disp_proprieta_key: number;
        public tipo_procedimento_proprieta_key: number;
        public dis_proprieta: string;
        public dis_tipologia: string;
        public dis_order: number;
        public dis_dispositivo_key: number;
        public disp_altri_dati_key: number;
        public dis_testo: string;
        public dis_valore: string;
    }

    export class Attivita {
        public att_nome_sito: string;
        public attivita_key: number;
        public att_attivita_key: number;
        public att_azienda_key: number;
        public att_titolo: string;
        public att_descrizione: string;
        public att_data_inizio_prev: string;
        public att_data_fine_prev: string;
        public att_data_scadenza: string;
        public att_conclusa: string;
        public att_tipo_attivita_cod: number;
        public att_tipo_scadenza_cod: number;
        public att_emergenza: string;
        public att_firma_richiesta: string;
        public tab_tipo_attivita_desc: string;
        public tab_tipo_scadenza_desc: string;
        public att_frequenza_cod: number;
        public az_codice_interno: string;
        public az_ragione_sociale: string;
        public gruppo_key: number;
        public gr_ragione_sociale: string;
        public societa_gestione_key: number;
        public att_dispositivo_key: number;
        public dis_titolo: string;
        public tab_tipo_dispositivo_cod: number;
        public tab_tipo_dispositivo_desc: string;
        public att_data_fine_effettiva: string;
        public att_data_inizio_effettiva: string;
        public att_stato_attivita_cod: number;
        public att_attivita_modulo_chiusura_key: number;
        public commenti_num: number;
        public assegnata_num: number;
        public tab_stato_attivita_desc: string;
        public att_efficacia_azione_key: number;
        public att_protocollo: string;
        public att_stato_attivita: string;
    }

}
