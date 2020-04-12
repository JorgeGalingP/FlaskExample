export class Wordcount {
    constructor(
      public id: string,
      public url: string,
      public result_all?: string,
      public result_no_stop_words?: string,
    ) { }
  }