let posG = 0;
let posA = 100;
let distanza = 100;
let distanzaAG = 100;
let Corri = false;
let Schivando = false;
let PuòSchivare = true;
let InMoto = false;
let AllAttacco = false;
let InPausa = false;
let InCarica = false;
let RimaniQui = true;
let stavaattaccando;
let stavamuovendosi;
let Spara;
let Partita;
let Colpo = false;
let gap;
let risparo = true;
let ArmaPresa;
let Boss = document.querySelector('#Nemico');
let ArmaInCanna = document.querySelector('#Arma');
let PersonaggioGiocabile = document.querySelector('#PGiocabile');
let Mirino = document.querySelector('#Mirino');
let PiuInfo = document.querySelector('#Info');
let AttaccoNemico = document.querySelector('#Attacco');
let BarraVita = document.querySelector('#Barra');
let hp = document.querySelector('#HP');
let BarraMischia = document.querySelector('#BarraMischia');
let Segnaposto1 = document.querySelector('#S1');
let Segnaposto2 = document.querySelector('#S2');
let RumoriArma = document.querySelector('#Rumori');
let FrasiNemico = document.querySelector('#Frasi');
let PannelloPausa = document.querySelector('#Pausa');
let PannelloConferma = document.querySelector('#Conferma');
let BottoneSpara = document.querySelector("#Spara");
let BottoneRicarica = document.querySelector("#Ricarica");
let BottoneMuoviSu = document.querySelector("#MuoviSu");
let BottoneMuoviGiù = document.querySelector("#MuoviGiù");
let BottoneSchiva = document.querySelector("#Schiva");
let BottoneMischia = document.querySelector("#Mischia");
let BottoneShotgun = document.querySelector("#Shotgun");
let BottoneAssalto = document.querySelector("#Assalto");
let BottoneCecchino = document.querySelector("#Cecchino");
function AggiornaMirino(ArmaEquipaggiata,distanza)
{
    if(ArmaEquipaggiata.portata >= distanza && Mirino.style.color != "red")
    {
        Mirino.style.color = 'red';
    }
    else if(ArmaEquipaggiata.portata < distanza && Mirino.style.color != "white")
    {
        Mirino.style.color = 'white';
    }
}
function Pulisci(Spara,gap)
{
    if(Spara != undefined)
    {
        clearInterval(Spara);
        Spara = undefined;
    }
    if(gap != undefined)
    {
        clearInterval(gap);
        gap = undefined;
    }
}
function CambioArma(ArmaPresa,Spara,gap)
{
    ArmaInCanna.classList.add('VaiGiù');
    Pulisci(Spara,gap);
    InCarica = true;
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "vaiGiù") {{ArmaInCanna.classList.remove('VaiGiù');
    ArmaInCanna.classList.add('TornaSu');
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "tornaSu"){
    ArmaInCanna.classList.remove('TornaSu');
    Mirino.innerHTML = ArmaPresa.mirino;
    if(ArmaPresa.rateo != 45000)
    {
        PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    } 
    else
    {
        PiuInfo.textContent = "";
    }
    InCarica = false;
    AggiornaMirino(ArmaPresa,distanza);}
    },{once: true,});
    }}},{once: true,});
    return false;
}
function Preso(ArmaPresa,distanza,NemicoScelto)
{
    if(ArmaPresa.portata >= distanza)
    {
        NemicoScelto.vita = NemicoScelto.vita - ArmaPresa.danni;
        BarraVita.style.width = `${Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2)*30.875}vw`;
        BarraVita.style.right = `${15.4375*(1 - Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2))}vw`;
        if(NemicoScelto.vita <= 0)
        {
            Fine(Partita,true,NemicoScelto);
        }
        return true;
    }
    else
    {
        return false;
    }
}
function Colpito(Protagonista)
{
    if(distanzaAG <= 0)
    {   
        if(!Schivando)
        {
            Protagonista.vita -= 1;
            hp.textContent = `HP: ${Protagonista.vita}`;
            hp.classList.add("LampeggiaHP");
            hp.addEventListener('animationend',() => {hp.classList.remove("LampeggiaHP");},{once: true,});
            if(Protagonista.vita <= 0)
        {
            Fine(Partita,false,NemicoScelto);
        }
        }
        distanzaAG = distanza;
        AttaccoNemico.style.color = "transparent";
        AttaccoNemico.style.transform = `scale(${Math.max(10/distanzaAG,1)})`;
    }
}
function PausaRiprendi(NemicoScelto)
{   
    if(!InPausa)
    {
        InPausa = true;
        stavaattaccando = AllAttacco;
        stavamuovendosi = InMoto;
        ArmaInCanna.style.animationPlayState = "paused";
        BarraMischia.style.animationPlayState = "paused";
        PersonaggioGiocabile.style.animationPlayState = "paused";
        hp.style.animationPlayState = "paused";
        Corri = false;
        PersonaggioGiocabile.classList.remove('Scuoti');
        PannelloPausa.showModal();
    }
    else
    {
        InPausa = false;
        if(stavaattaccando)
        {   
            AllAttacco = true;
            NemicoScelto.Attacco(Protagonista); 
        }
        if(stavamuovendosi)
        {   
            NemicoScelto.Moto();
        }
        ArmaInCanna.style.animationPlayState = "running";
        BarraMischia.style.animationPlayState = "running";
        PersonaggioGiocabile.style.animationPlayState = "running";
        hp.style.animationPlayState = "running";
        PannelloPausa.close();
    }
}
function Fine(Partita,vittoria,NemicoScelto)
{
        clearInterval(Partita);
        InPausa = true;
        PiuInfo.style.color = "transparent";
        BarraMischia.style.backgroundColor = "transparent";
        document.querySelector('#PienBarraMischia').style.backgroundColor = "transparent";
        Pulisci(Spara,gap);
        Mirino.style.color = "transparent";
        AttaccoNemico.style.color = "transparent";
        setTimeout(() => {document.querySelectorAll('.Comandi , .CambioArmi').forEach(B => {B.style.opacity = "0";});},500);
        if(vittoria)
        {   
            document.querySelector('#SchermataPausa').style.color = "green";
            document.querySelector('#SchermataPausa').innerHTML = `VITTORIA! <button type = "button" id = "Riprendi" ontouchstart = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" ontouchstart = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" ontouchstart="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" ontouchstart = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            Boss.style.transform = `scale(1)`;
            Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_1.jpg`;
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[2]}`; ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_1.jpg`;},500);
            if(window.localStorage.getItem(`${NemicoScelto.nome}`) == null || difficoltà > window.localStorage.getItem(`${NemicoScelto.nome}`))
            {
                window.localStorage.setItem(`${NemicoScelto.nome}`,`${difficoltà}`);
            }
            setTimeout(() => {ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_2.jpg`; Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_2.jpg`;},1500);
        }
        else
        {   
            document.querySelector('#SchermataPausa').style.color = "red";
            document.querySelector('#SchermataPausa').innerHTML = `Game Over <button type = "button" id = "Riprendi" ontouchstart = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" ontouchstart = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" ontouchstart="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" ontouchstart = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            ArmaInCanna.classList.add('VaiGiù');
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[1]}`},500);
            setTimeout(() => {ArmaInCanna.classList.remove('VaiGiù'); ArmaInCanna.classList.add('TornaSu'); ArmaInCanna.src = "./Immagini/Animazioni/Animazione Sconfitta.jpg"},500);
            setTimeout(() => {ArmaInCanna.classList.remove('TornaSu')},1000);
        }
        setTimeout(() => {PannelloPausa.showModal();},3000);
}
function Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto)
{   
    ArmaPresa = AssaltoEquipaggiato;
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    Mirino.innerHTML = ArmaPresa.mirino;
    AttaccoNemico.textContent = NemicoScelto.attacco;
    PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    NemicoScelto.velocità = Math.pow(1.5,difficoltà)*10;
    NemicoScelto.vita = Math.pow(1.2,difficoltà)*300000;
    NemicoScelto.maxvita = NemicoScelto.vita;
    Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;
    AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
    Segnaposto1.style.transform = `scale(${10/Math.max(posG,10)})`;
    Segnaposto2.style.transform = `scale(${10/Math.max(200 - posG,10)})`;
    AggiornaMirino(ArmaPresa,distanza);
    BottoneMischia.addEventListener('touchstart', (event) => {event.stopPropagation(); if(!InPausa){BottoneMischia.style.opacity = "1"; setTimeout(() => {BottoneMischia.style.opacity = "0.5";},100);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {
            risparo = true;
            Colpo = CambioArma(MischiaEquipaggiata,Spara,gap);
            risparo = true;
            ArmaPresa = MischiaEquipaggiata;}}});
    BottoneShotgun.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneShotgun.style.opacity = "1"; setTimeout(() => {BottoneShotgun.style.opacity = "0.5";},100);
                if(ArmaPresa != ShotgunEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = CambioArma(ShotgunEquipaggiato,Spara,gap);
            risparo = true;
            ArmaPresa = ShotgunEquipaggiato;}}});
    BottoneAssalto.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneAssalto.style.opacity = "1"; setTimeout(() => {BottoneAssalto.style.opacity = "0.5";},100);
                if(ArmaPresa != AssaltoEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = CambioArma(AssaltoEquipaggiato,Spara,gap);
            risparo = true;
            ArmaPresa = AssaltoEquipaggiato;}}});
    BottoneCecchino.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneCecchino.style.opacity = "1"; setTimeout(() => {BottoneCecchino.style.opacity = "0.5";},100);
                if(ArmaPresa != CecchinoEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = CambioArma(CecchinoEquipaggiato,Spara,gap);
            risparo = true;
            ArmaPresa = CecchinoEquipaggiato;}}});
    BottoneRicarica.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneRicarica.style.opacity = "1"; setTimeout(() => {BottoneRicarica.style.opacity = "0.5";},100);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {   
                Pulisci(Spara,gap);
                risparo = true;
                ArmaPresa.Ricarica();}}});
    BottoneSchiva.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneSchiva.style.opacity = "1"; setTimeout(() => {BottoneSchiva.style.opacity = "0.5";},100);
                if(!Schivando && PuòSchivare)
                {  
                   Protagonista.Schiva(); 
}}});
    BottoneSpara.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneSpara.style.opacity = "1";
            if(!Colpo && !InCarica && risparo)
            {   
                ArmaPresa.Fuoco(NemicoScelto);
            }}
        else
        {
            ArmaPresa.Arresta();
        }});
    BottoneMuoviSu.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneMuoviSu.style.opacity = "1";
                if(!Corri)
                {   
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(true);
}}});
    BottoneMuoviGiù.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){BottoneMuoviGiù.style.opacity = "1";
                if(!Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(false);
}}});
    BottoneMuoviSu.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneMuoviSu.style.opacity = "0.5"; Corri = false; PersonaggioGiocabile.classList.remove('Scuoti');});
    BottoneMuoviGiù.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneMuoviGiù.style.opacity = "0.5"; Corri = false; PersonaggioGiocabile.classList.remove('Scuoti');});
    BottoneSpara.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneSpara.style.opacity = "0.5"; ArmaPresa.Arresta()});
    document.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){if(Spara != undefined){clearInterval(Spara); Spara = undefined;} document.querySelectorAll(".movimento , #Spara").forEach(B => {B.style.opacity = "0.5";}); PausaRiprendi(NemicoScelto)}});
    Partita = setInterval(() => {
        if(Math.random() < 0.5 && !AllAttacco)
        {
            NemicoScelto.AllAttacco(Protagonista);
        }
        else
        {   
            NemicoScelto.Moto();
        }
    },4000/difficoltà);
}
function VaiVaiVai()
{
    Nemici.forEach(N => {if(sessionStorage.getItem("Nemico scelto") == N.nome){NemicoScelto = N;}});
    Armi.forEach(A => {if(sessionStorage.getItem("ShotgunEquipaggiato") == A.nome){ShotgunEquipaggiato = A;} else if (sessionStorage.getItem("AssaltoEquipaggiato") == A.nome){AssaltoEquipaggiato = A;} else if (sessionStorage.getItem("CecchinoEquipaggiato") == A.nome){CecchinoEquipaggiato = A;}});
    Mischie.forEach(M => {if(sessionStorage.getItem("MischiaEquipaggiata") == M.nome){MischiaEquipaggiata = M;}})
    difficoltà = Number(sessionStorage.getItem("Difficoltà"));
    AggiornaImpostazioni();
    Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto);
}
