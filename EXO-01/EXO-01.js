const calendrierMatchs = [
  {
    id: 'LFL_KC_SLY',
    jeu: 'League of Legends',
    competition: 'LFL',
    equipeA: 'Karmine Corp',
    equipeB: 'Solary',
    probabiliteA: 0.65, // 65% de chance pour KC
    statut: 'À venir'
  },
  {
    id: 'VCT_VIT_M8',
    jeu: 'Valorant',
    competition: 'VCT EMEA',
    equipeA: 'Team Vitality',
    equipeB: 'Mandatory',
    probabiliteA: 0.55, // 55% de chance pour Vitality
    statut: 'À venir'
  },
  {
    id: 'LFL_GO_BDS',
    jeu: 'League of Legends',
    competition: 'LFL',
    equipeA: 'Gentle Mates',
    equipeB: 'BDS Academy',
    probabiliteA: 0.48, // 48% de chance pour M8, donc BDS est favori
    statut: 'À venir'
  },
  {
    id: 'LFL_KC_M8',
    jeu: 'Valorant',
    competition: 'VCT EMEA',
    equipeA: 'Karmine Corp',
    equipeB: 'Mandatory',
    probabiliteA: 0.52,
    statut: 'À venir'
  }
];


class Match {
  constructor(id, jeu, competition, equipeA, equipeB, probabiliteA, statut) {
    this.id = id;
    this.jeu = jeu;
    this.competition = competition;
    this.equipeA = equipeA;
    this.equipeB = equipeB;
    this.probabiliteA = probabiliteA;
    this.statut = statut;
  }
  getFavori() {
    if (this.probabiliteA > 0.5) {
      return this.equipeA;
    } else return this.equipeB;
  }
}

class Plateforme {
  constructor(nom) {
    this.nom = nom;
    this.matchs = [];
  }
  chargerMatchs(matchsACcharger) {
    matchsACcharger.forEach(matchData => {
      const match = new Match(
        matchData.id,
        matchData.jeu,
        matchData.competition,
        matchData.equipeA,
        matchData.equipeB,
        matchData.probabiliteA,
        matchData.statut
      );
      this.matchs.push(match);
    });
  }
  afficherCalendrier() {
    this.matchs.forEach(match => {
      console.log(
        `${match.statut} | [${match.competition}] ${match.equipeA} vs ${match.equipeB} - Jeu: ${match.jeu} - Favori: ${match.getFavori()}`);
    }
    );
  }
  getMatchsParJeu(jeu) {
    console.log("Filtre Valorant : ")
    return this.matchs.filter(match => match.jeu === jeu);
  }
  getMatchsRisques() {
    console.log("Matchs à risques : ")
    return this.matchs.filter(match => match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55);
  }
  getMatchsById(id) {
    console.log("Matchs par ID : ")
    return this.matchs.find(match => match.id === id);
  }
}


const plateforme = new Plateforme("esportVision");
plateforme.chargerMatchs(calendrierMatchs);
plateforme.afficherCalendrier();
console.log(plateforme.getMatchsParJeu("Valorant"));
console.log(plateforme.getMatchsRisques());
console.log(plateforme.getMatchsById("LFL_KC_M8"));