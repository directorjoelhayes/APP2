import '../App.css'

class Layer{
    constructor(laagNaam, keuzeType, keuzeMateriaal, lambda, keuzeDikte, UWaarde){
        this.naam = laagNaam;
        this.type= keuzeType;
        this.materiaal= keuzeMateriaal
        this.lambda= lambda
        this.dikte= keuzeDikte
        this.UWaarde=UWaarde
    }

}

export default Layer
