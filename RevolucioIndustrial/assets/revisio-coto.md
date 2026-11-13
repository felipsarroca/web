# Revisió del moviment del cotó

13 de novembre de 2026. Canvi autoritzat per Felip, amb conservació de la versió anterior a `versions/2026-11-13-coto-abans-revisio/`.

## Criteri didàctic

Cada escena relaciona acció, transformació, producte i guany. La vista obliqua és fixa i el mecanisme ocupa més espai que les potes i el bastidor. Només les etiquetes de la fase són visibles per defecte; les opcions existents permeten mostrar-les totes o amagar-les. Una comparació breu explica l’aportació abans de començar. El missatge inferior descriu l’acció real que està passant al dibuix.

Els estats de `js/textil-estats.js` governen alhora els moviments i els missatges. Les velocitats es redueixen per observar-los, els colors separen funcions i les fibres individuals es dibuixen amb longitud constant: llisquen dins d’una metxa que s’aprima. Els fils, els girs i els volums recollits no mesuren la productivitat històrica. Els cicles didàctics es reinicien; no simulen l’acumulació indefinida de fil.

## Màquines i fonts

| Escena | Què es mostra | Què aporta | Font primària o museística |
|---|---|---|---|
| Roda manual de fus | Estiratge amb la mà, torsió a la punta, canvi de posició i recollida al fus | Transmetre el gir de la roda al fus; encara un sol fil i control manual | [Science Museum Group · great wheel](https://collection.sciencemuseumgroup.org.uk/objects/co44851/great-wheel) |
| Llançadora volant | Cordill, taco d’impuls, pas dins de la calada i batuda posterior; dues trames incorporades | Un teixidor pot passar la trama en peces més amples i treballar més de pressa | [Lancashire Museums · John Kay](https://lancashiremuseumsstories.wordpress.com/2020/05/22/john-kay-and-the-flying-shuttle/) |
| Jenny | Pinça oberta/tancada, estiratge comú, torsió i retorn amb vuit cons que creixen | Diversos fils alhora amb una màquina manual | [Lancashire Museums · James Hargreaves](https://lancashiremuseumsstories.wordpress.com/2020/05/29/james-hargreaves-and-the-spinning-jenny/) |
| Water Frame | Parelles que giren en sentits oposats, velocitats successives creixents, metxa més prima i recollida contínua | Mecanitzar l’estiratge i produir fil resistent amb energia exterior | [Science Museum Group · model de 1775](https://collection.sciencemuseumgroup.org.uk/objects/co44832/arkwrights-water-frame-1775) |
| Mula | Alimentació amb sortida del carro, aturada dels corrons, estiratge final, preparació de la guia i retorn | Combinar finor i resistència amb nombrosos fusos | [Bolton Museum · Crompton’s mule](https://www.revealinghistories.org.uk/why-was-cotton-so-important-in-north-west-england/objects/crompton-s-mule.html) |

La roda manual substitueix l’anterior roda de Saxònia de pedal i aleta, més adequada com a exemple de lli o llana. Les dues làmines noves es generen amb ChatGPT i es documenten a `assets/prompts-coto-revisio.json`.

La Water Frame té quatre caps esquemàtics i tres parelles de corrons. Els corrons frontals es mostren parcialment transparents i el recorregut de fibra es ressalta perquè sigui visible. El museu documenta un model de 1775 de vuit fils; aquest dibuix no n’és una rèplica. Les relacions de velocitat són il·lustratives i no es presenten com a dades històriques. La mula mostra sis fusos i un cicle simplificat del principi, sense atribuir tots els mecanismes de models posteriors al prototip de 1779.

## La cursa i els guanys

S’ha substituït la balança amb quantitats arbitràries per una seqüència de problemes, solucions i aportacions. No s’afirma que vuit fusos equivalguin a vuit vegades més productivitat ni que la llançadora dupliqui universalment la producció. La invenció, la difusió i les millores posteriors es distingeixen. La revisió historiogràfica de [Maw i altres, *After the great inventions*](https://onlinelibrary.wiley.com/doi/10.1111/ehr.13082) fonamenta aquesta prudència.

## Verificació i recuperació

- Prova de cinemàtica amb 1.001 posicions del cicle: espai de pas, batuda, corrons, rodament i recollida.
- Prova al navegador de les 27 escenes en cinc mides; es comproven controls, modes, etiquetes, peces, reptes i desbordaments.
- Inspecció visual de les cinc màquines i de la síntesi; revisió de les fases i de les pantalles de mòbil.
- Comprovació SHA-256 dels 80 fitxers conservats. La còpia anterior funciona com un web independent.

El restaurador només actua amb `--aplica`. Per defecte mostra els fitxers que recuperaria; no elimina els nous ni publica automàticament. Els estils compartits originals també estan conservats, però es deixen fora de la restauració parcial per evitar afectar els altres capítols.
