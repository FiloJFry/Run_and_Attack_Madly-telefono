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
    AllAttacco(Protagonista)
    {   
        if(!InPausa)
        {
            AllAttacco = true;
            Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}_attaccando.jpg`);
            FrasiNemico.textContent = `${this.Frasi[0]}`;
            AttaccoNemico.style.color = this.coloreAttacco;
            let t = 0;
            let dice = setInterval(() => {if(!InPausa){t += 100; if(t >= 1000){Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}.jpg`); FrasiNemico.textContent = ""; clearInterval(dice)}}},100);
            this.Attacco(Protagonista);
        }
    }
    Attacco(Protagonista)
    {   
        setTimeout(() => {
        if(distanzaAG > 0 && !InPausa)
        {
            distanzaAG = distanzaAG - 1;
            AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
            this.Attacco(Protagonista);
        }
        else
        {   
            Colpito(Protagonista);
            AllAttacco = false;
            return;
        }},1000/this.velocità);
    }
    Moto()
    {   
        let direzione = Math.random() < 0.5;
        let spazio = Math.floor(Math.random()*200);
        InMoto = true;
        this.AggiornaPosizione(direzione,spazio);
    }
    AggiornaPosizione(direzione,spazio)
    {   
        setTimeout(() => {
        if(spazio > 0 && InMoto && posA >= 0 && posA <= 200 && !InPausa)
        {
        if(direzione && posA > 0)
        {
            posA = posA - 1;
            if(posA < posG)
            {
                distanza = distanza + 1;
            }
            else
            {
                distanza = distanza - 1;
            }
        }
        else if(!direzione && posA < 200)
        {
            posA += 1;
            if(posA > posG)
            {
                distanza = distanza + 1;
            }
            else
            {
                distanza = distanza - 1;
            }
        }
        if((direzione && posA == 0) || (!direzione && posA == 200))
        {   
            InMoto = false;
            return;
        }
        else
        {
        spazio -= 1;
        Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;      
        if(AttaccoNemico.style.color == "transparent")
        {
            distanzaAG = distanza;
            AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
        }
        AggiornaMirino(ArmaPresa,distanza);
        this.AggiornaPosizione(direzione,spazio);
        }
        }
        else
        {
            InMoto = false;
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
    Fuoco(NemicoScelto)
    {
        ArmaPresa.Spara(NemicoScelto);
        Colpo = true;
        if(ArmaPresa.altorateo)
        {   
            Spara = setInterval(() => {ArmaPresa.Spara(NemicoScelto);},ArmaPresa.rateo + 100);
        }
        else if(risparo)
        {   
            risparo = false;
            let cont = 0;
            gap = setInterval(() => {if(!InPausa){cont += 100; if(cont >= this.rateo + 100){clearInterval(gap); risparo = true;}}},100);
        }
    }
    Arresta()
    {
        Colpo = false;
        if(ArmaPresa.altorateo)
        {
            if(Spara != undefined)
            {
                clearInterval(Spara);
                Spara = undefined;
            }
        }
    }
    Spara(NemicoScelto)
    {    
        if(this.munizioni > 0)
        { 
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni -= 1;
            PiuInfo.textContent = `${this.munizioni}|${this.inventario}`;
            RumoriArma.textContent = `${this.Rumori[0]}`; 
            Preso(this,distanza,NemicoScelto);
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
            InCarica = true;
            this.Step("Ricarica","_ricarica1");
        }
        else if(this.inventario == 0)
        {
            PiuInfo.style.color = "red";
            setTimeout(() => {PiuInfo.style.color = "white";},1000);
        }
    }
    Step(a,p)
    {
        ArmaInCanna.classList.add('VaiGiù');
        ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "vaiGiù"){
        ArmaInCanna.classList.remove('VaiGiù'); 
        ArmaInCanna.setAttribute('src',`./Immagini/${a}/${this.nome}${p}.jpg`); 
        ArmaInCanna.classList.add('TornaSu'); 
        ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "tornaSu"){
        ArmaInCanna.classList.remove('TornaSu');
        if(p != "")
        {
            RumoriArma.textContent = `${this.Rumori[p.split('a')[2]]}`;
            if(p.split('a')[2] == 1)
            {   
                this.Step("Ricarica","_ricarica2");
            }
            else
            {   
                this.Step("Armi","");
            }
        } 
        else
        {
            RumoriArma.textContent = "";
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
            InCarica = false;
        }
        }},{once: true,});
        }},{once: true,});
    }
}
class Mischia extends Arma
{   
    Spara(NemicoScelto)
    {
        if(this.munizioni == 1)
        {
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni = 0;
            if(Preso(this,distanza,NemicoScelto))
            {
                ShotgunEquipaggiato.inventario += 3*ShotgunEquipaggiato.maxmunizioni;
                AssaltoEquipaggiato.inventario += 3*AssaltoEquipaggiato.maxmunizioni;
                CecchinoEquipaggiato.inventario += 3*CecchinoEquipaggiato.maxmunizioni;
            }
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}.jpg`);},100);
        }
        else
        {
            document.querySelector('#PienBarraMischia').style.backgroundColor = 'red';
            setTimeout(() => {document.querySelector('#PienBarraMischia').style.backgroundColor = 'white';},1000);
        }
        this.Ricarica();
    }
    Ricarica()
    {   
        BarraMischia.classList.add('BarraInCarica');
        BarraMischia.addEventListener('animationend',() => {this.munizioni = 1; BarraMischia.classList.remove('BarraInCarica');},{once: true,});
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
        PersonaggioGiocabile.classList.add('Schivata');
        Schivando = true;
        PuòSchivare = false;
        PersonaggioGiocabile.addEventListener('animationend',() => {PersonaggioGiocabile.classList.remove('Schivata');
        Schivando = false;
        let sec = 0;
        let riprenditi = setInterval(() => {if(!InPausa){sec += 100; if(sec >= 600){PuòSchivare = true; clearInterval(riprenditi);}}},100);},{once: true,});
    }
    Muovi(verso)
    {   
        setTimeout(() => {if(Corri && posG <= 200 && posG >= 0 && !InPausa)
        {
        if(verso && posG < 200)
        {
            posG = posG + 1;
            if(posG > posA)
            {
                distanza = distanza + 1;
                distanzaAG = distanzaAG + 1;
            }
            else
            {
                distanza = distanza - 1;
                distanzaAG = distanzaAG - 1;
            }
        }
        else if(!verso && posG > 0)
        {
            posG = posG - 1;
            if(posG < posA)
            {
                distanza = distanza + 1;
                distanzaAG = distanzaAG + 1;
            }
            else
            {
                distanza = distanza - 1;
                distanzaAG = distanzaAG - 1;
            }
        }
        if((verso && posG == 200) || (!verso && posG == 0))
        {
            PersonaggioGiocabile.classList.remove('Scuoti');
            Corri = false;
            return;
        }
        else
        {
        Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;
        AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
        Segnaposto1.style.transform = `scale(${10/Math.max(posG,10)})`;
        Segnaposto2.style.transform = `scale(${10/Math.max(200 - posG,10)})`;
        AggiornaMirino(ArmaPresa,distanza);
        this.Muovi(verso);
    }
    }
    else
    {   
        PersonaggioGiocabile.classList.remove('Scuoti');
        Corri = false; 
        return;
    }},1000/this.velocità);
}
}