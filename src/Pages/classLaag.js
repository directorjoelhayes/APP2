import '../App.css'

class Layer{
    constructor(laagNaam, keuzeType, keuzeMateriaal, lambda, keuzeDikte,kleur, UWaarde){
        this.naam = laagNaam;
        this.type= keuzeType;
        this.materiaal= keuzeMateriaal
        this.lambda= lambda
        this.dikte= keuzeDikte
        this.kleur= kleur
        this.UWaarde=UWaarde
    }

}

export default Layer
