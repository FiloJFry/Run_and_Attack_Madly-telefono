class Nemico
{
    constructor(nome,velocità,vita,attacco,coloreAttacco,Frasi)
    {
        this._nome = nome;
        this._velocità = velocità;
        this._vita = vita;
        this._maxvita = vita;
        this._attacco = attacco;
        this._coloreAttacco = coloreAttacco;
        this._Frasi = Frasi
    }
    get nome()
    {
        return this._nome;
    }
    get vita()
    {
        return this._vita;
    }
    set vita(life)
    {
        this._vita = life;
    }
    set velocità(boost)
    {
        this._velocità = boost;
    }
    get velocità()
    {
        return this._velocità;
    }
    set maxvita(lifelife)
    {
        this._maxvita = lifelife;
    }
    get maxvita()
    {
        return this._maxvita;
    }
    set attacco(at)
    {
        this._attacco = at;
    }
    get attacco()
    {
        return this._attacco;
    }
    set coloreAttacco(cat)
    {
        this._coloreAttacco = cat;
    }
    get coloreAttacco()
    {
        return this._coloreAttacco;
    }
    set Frasi(voiceline)
    {
        this._Frasi = voiceline;
    }
    get Frasi()
    {
        return this._Frasi;
    }
    AllAttacco(DatiDiPosizione)
    {   
        if(!DatiDiPosizione.InPausa)
        {
            DatiDiPosizione.AllAttacco = true;
            Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}_attaccando.jpg`);
            FrasiNemico.textContent = `${this.Frasi[0]}`;
            AttaccoNemico.style.color = this.coloreAttacco;
            setTimeout(() => {Boss.setAttribute('src',`./Immagini/Immagini/Nemici/${this.nome}.jpg`); FrasiNemico.textContent = "";},1000);
            this.Attacco(DatiDiPosizione);
        }
    }
    Attacco(DatiDiPosizione)
    {   
        setTimeout(() => {
        if(DatiDiPosizione.distanzaAG > 0 && !DatiDiPosizione.InPausa)
        {
            DatiDiPosizione.distanzaAG = DatiDiPosizione.distanzaAG - 1;
            AttaccoNemico.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanzaAG,1)})`;
            this.Attacco(DatiDiPosizione);
        }
        else
        {   
            DatiDiPosizione.AllAttacco = false;
            return;
        }},1000/this.velocità);
    }
    Moto(DatiDiPosizione)
    {   
        let direzione = Math.random() < 0.5;
        let spazio = Math.random()*200;
        DatiDiPosizione.InMoto = true;
        this.AggiornaPosizione(direzione,DatiDiPosizione,spazio);
    }
    AggiornaPosizione(direzione,DatiDiPosizione,spazio)
    {   
        setTimeout(() => {
        if(spazio > 0 && DatiDiPosizione.InMoto && DatiDiPosizione.posA >= 0 && DatiDiPosizione.posA <= 200 && !DatiDiPosizione.InPausa)
        {
        if(direzione && DatiDiPosizione.posA > 0)
        {
            DatiDiPosizione.posA = DatiDiPosizione.posA - 1;
            if(DatiDiPosizione.posA < DatiDiPosizione.posG)
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza + 1;
            }
            else
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza - 1;
            }
        }
        else if(!direzione && DatiDiPosizione.posA < 200)
        {
            DatiDiPosizione.posA += 1;
            if(DatiDiPosizione.posA > DatiDiPosizione.posG)
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza + 1;
            }
            else
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza - 1;
            }
        }
        spazio -= 1;
        Boss.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanza,10)})`;
        if(AttaccoNemico.style.color == "transparent")
        {
            DatiDiPosizione.distanzaAG = DatiDiPosizione.distanza;
            AttaccoNemico.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanzaAG,1)})`;
        }
        this.AggiornaPosizione(direzione,DatiDiPosizione,spazio);
        }
        else
        {
            DatiDiPosizione.InMoto = false;
            return;
        }},1000/this.velocità);
    }

}
class Arma
{   
    constructor(nome,danni,portata,munizioni,inventario,rateo,altorateo,mirino,Rumori)
    {
        this._nome = nome;
        this._danni = danni;
        this._portata = portata;
        this._munizioni = munizioni;
        this._maxmunizioni = munizioni;
        this._inventario = inventario;
        this._rateo = rateo;
        this._altorateo = altorateo;
        this._mirino = mirino;
        this._Rumori = Rumori;
    }
    set nome(name)
    {   
        this._nome = name;
    }
    get nome()
    {
        return this._nome;
    }
    set danni(danni)
    {
        this._danni = danni;
    }
    get danni()
    {
        return this._danni;
    }
    set portata(portata)
    {
        this._portata = portata;
    }
    get portata()
    {
        return this._portata;
    }
    set munizioni(ammo)
    {
        this._munizioni = ammo;
    }
    get munizioni()
    {
        return this._munizioni;
    }
    set inventario(ammo)
    {
        this._inventario = ammo;
    }
    get inventario()
    {
        return this._inventario;
    }
    set rateo(rateo)
    {
        this._rateo = rateo;
    }
    get rateo()
    {
        return this._rateo;
    }
    set altorateo(altorateo)
    {
        this._altorateo = altorateo;
    }
    get altorateo()
    {
        return this._altorateo;
    }
    set maxmunizioni(riferimento)
    {
        this._maxmunizioni = riferimento;
    }
    get maxmunizioni()
    {
        return this._maxmunizioni;
    }
    set mirino(testo)
    {
        this._mirino = testo;
    }
    get mirino()
    {
        return this._mirino;
    }
    set Rumori(suoni)
    {
        this._Rumori = suoni; 
    }
    get Rumori()
    {
        return this._Rumori;
    }
    Spara()
    {    
        if(this.munizioni > 0)
        { 
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni -= 1;
            PiuInfo.textContent = `${this.munizioni}|${this.inventario}`;
            RumoriArma.textContent = `${this.Rumori[0]}`; 
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}.jpg`); RumoriArma.textContent = "";},100);
        }
        else
        {   
            PiuInfo.style.color = 'red';
            setTimeout(() => {PiuInfo.style.color = 'white';},1000);
        }
    }
    Ricarica()
    {   
        if(this.inventario > 0 && this.munizioni < this.maxmunizioni)
        {
            this.Step("Ricarica","_ricarica1");
            setTimeout(() => {this.Step("Ricarica","_ricarica2")},1000);
            setTimeout(() => {this.Step("Armi","")},2000);
        }
        else if(this.inventario == 0)
        {
            PiuInfo.style.color = "red";
            setTimeout(() => {PiuInfo.style.color = "white";},1000);
        }
    }
    Step(a,p)
    {
        ArmaInCanna.classList.add('slideOutDown');
        setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/${a}/${this.nome}${p}.jpg`); ArmaInCanna.classList.remove('slideOutDown'); ArmaInCanna.classList.add('slideInUp'); if(p != ""){RumoriArma.textContent = `${this.Rumori[p.split('a')[2]]}`;} else{RumoriArma.textContent = "";}},500);
        setTimeout(() => {ArmaInCanna.classList.remove('slideInUp');
        if(p == "")
        {   
            let carica = this.maxmunizioni - this.munizioni;
            if(this.inventario < carica)
        {
            this.munizioni += this.inventario;
            this.inventario = 0;
        }
        else
        {
            this.inventario -= carica;
            this.munizioni = this.maxmunizioni;
        }
            PiuInfo.textContent = `${this.munizioni}|${this.inventario}`;
        }},1000);
    }
}
class Mischia extends Arma
{   
    Spara()
    {
        if(this.munizioni == 1)
        {
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni = 0;
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}.jpg`);},100);
        }
        else
        {
            document.querySelector('#PienBarraMischia').style.backgroundColor = 'red';
            setTimeout(() => {document.querySelector('#PienBarraMischia').style.backgroundColor = 'white';},1000);
        }
    }
    Ricarica()
    {   
        BarraMischia.classList.add('BarraInCarica');
        BarraMischia.addEventListener('animationend',() => this.Fatto());
    }
    Fatto()
    {   
        this.munizioni = 1; 
        BarraMischia.classList.remove('BarraInCarica');
        BarraMischia.removeEventListener('animationend',() => this.Fatto());
    }
}
class Personaggio
{   
    constructor()
    {
        this._vita = 4;
        this._velocità = 12.5;
    }
    set vita(vita)
    {
        this._vita = vita;
    }
    get vita()
    {
        return this._vita;
    }
    set velocità(boost)
    {
        this._velocità = boost;
    }
    get velocità()
    {
        return this._velocità;
    }
    Schiva()
    {
        ArmaInCanna.classList.add('slideOutRight');
        setTimeout(() => {ArmaInCanna.classList.remove('slideOutRight')},400);
    }
    Muovi(verso,DatiDiPosizione)
    {   
        setTimeout(() => {if(DatiDiPosizione.Corri && DatiDiPosizione.posG <= 200 && DatiDiPosizione.posG >= 0 && !DatiDiPosizione.InPausa)
        {
        if(verso && DatiDiPosizione.posG < 200)
        {
            DatiDiPosizione.posG = DatiDiPosizione.posG + 1;
            if(DatiDiPosizione.posG > DatiDiPosizione.posA)
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza + 1;
                DatiDiPosizione.distanzaAG = DatiDiPosizione.distanzaAG + 1;
            }
            else
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza - 1;
                DatiDiPosizione.distanzaAG = DatiDiPosizione.distanzaAG - 1;
            }
        }
        else if(!verso && DatiDiPosizione.posG > 0)
        {
            DatiDiPosizione.posG = DatiDiPosizione.posG - 1;
            if(DatiDiPosizione.posG < DatiDiPosizione.posA)
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza + 1;
                DatiDiPosizione.distanzaAG = DatiDiPosizione.distanzaAG + 1;
            }
            else
            {
                DatiDiPosizione.distanza = DatiDiPosizione.distanza - 1;
                DatiDiPosizione.distanzaAG = DatiDiPosizione.distanzaAG - 1;
            }
        }
        Boss.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanza,10)})`;
        AttaccoNemico.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanzaAG,1)})`;
        Segnaposto1.style.transform = `scale(${10/Math.max(DatiDiPosizione.posG,10)})`;
        Segnaposto2.style.transform = `scale(${10/Math.max(200 - DatiDiPosizione.posG,10)})`;
        this.Muovi(verso,DatiDiPosizione);
    }
    else
    {   
        return;
    }},1000/this.velocità);
}
}
class SaccoDiDati
{
    constructor(posG,posA,distanza,distanzaAG,Corri,Schivando,InMoto,AllAttacco,InPausa)
    {
        this._posG = posG;
        this._posA = posA;
        this._distanza = distanza;
        this._distanzaAG = distanzaAG;
        this._Corri = Corri;
        this.Schivando = Schivando;
        this._InMoto = InMoto;
        this._AllAttacco = AllAttacco;
        this._InPausa = InPausa;
    }
    set posG(nposG)
    {
        this._posG = nposG;
    }
    get posG()
    {
        return this._posG;
    }
    set posA(nposA)
    {
        this._posA = nposA;
    }
    get posA()
    {
        return this._posA;
    }
    set distanza(ndistanza)
    {
        this._distanza = ndistanza;
    }
    get distanza()
    {
        return this._distanza;
    }
    set distanzaAG(ndistanzaAG)
    {
        this._distanzaAG = ndistanzaAG;
    }
    get distanzaAG()
    {
        return this._distanzaAG;
    }
    set Corri(agg)
    {
        this._Corri = agg;
    }
    get Corri()
    {
        return this._Corri;
    }
    set Schivando(Schivando)
    {
        this._Schivando = Schivando;
    }
    get Schivando()
    {
        return this._Schivando;
    }
    set InMoto(InMoto)
    {
        this._InMoto = InMoto;
    }
    get InMoto()
    {
        return this._InMoto;
    }
    set AllAttacco(AllAttacco)
    {
        this._AllAttacco = AllAttacco;
    }
    get AllAttacco()
    {
        return this._AllAttacco;
    }
    set InPausa(stato)
    {
        this._InPausa = stato;
    }
    get InPausa()
    {
        return this._InPausa;
    }
}
