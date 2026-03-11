// Conteúdo dos cases de portfólio (PT/EN) extraído de CasePage.jsx
// Mantém a mesma API: getCaseContent(caseId, caseData, lang = 'pt')

export function getCaseContent(caseId, caseData, lang = 'pt') {
  const client = (lang === 'en' && caseData.clientEn) ? caseData.clientEn : caseData.client
  const title = (lang === 'en' && caseData.titleEn) ? caseData.titleEn : caseData.title
  const shortTitle = (lang === 'en' && caseData.shortTitleEn) ? caseData.shortTitleEn : (caseData.shortTitle || caseData.client)

  if (caseId === 'ulbra-vsl-medicina') {
    if (lang === 'en') {
      return {
        pillLabel: 'VSL · Higher education',
        heroTitle: 'VSL for the Med School program that gives students real clinical practice from day one.',
        metaStrip: [
          { label: 'Client', value: 'Ulbra' },
          { label: 'Deliverable', value: 'Long-form VSL script' },
          { label: 'Context', value: 'Med School applicant lead generation' },
        ],
        briefingHeading: 'The differentiator was technical. The job was to make it emotional.',
        briefingParagraphs: [
          "Med Ulbra is Ulbra's medical degree program — with a concrete, rare differentiator: 75% of the curriculum dedicated to practice, with real patient contact from the first semester. While most schools only allow clinical practice in the tenth semester, Ulbra's method flips that logic from day one.",
          'The challenge was turning that technical fact into an emotional argument for an applicant who has not yet lived the frustration of being unprepared — but fears it. The VSL was built to anticipate that fear, make it tangible, and present Med Ulbra as the only smart way out.',
          'The script follows a classic long-form VSL structure: hook by analogy, problem setup, agitation of the pain, turn with the solution, proof with numbers, and closing with urgency. Each block has a clear role in the viewer journey.',
        ],
        copyEyebrow: 'Long-form VSL script — Med Ulbra · Medical degree · Ulbra',
        copyHeadline: 'A VSL that makes the applicant feel the weight of real medical practice before living it.',
        copySub: 'Script structured in blocks — from hook to final urgency.',
        copyParagraphs: [],
        copyList: [],
        copyBlocks: [
          {
            label: '[ Hook ]',
            text: `IMPORTANT NOTICE: the decision you make from here on may define your success as a physician. What you're about to read is about the trap many fall into — and how you can avoid it.

Imagine, for a moment, an airline pilot who spent years studying only the theory of flight.

They've mastered physics, meteorology, the engineering of the aircraft. Every detail, every button, every chart. Everything is memorized. They never failed a single subject.

There's just one catch: they've also never flown a real plane.

An excellent pilot in theory — and a complete novice in practice.

So here's my question: if you needed to take an emergency flight… would you trust your life to them on their first takeoff?`,
          },
          {
            label: '[ Problem ]',
            text: `I know that question may sound absurd — but it's exactly the dangerous reality the traditional medical education system is creating.

Replace the pilot with the doctor. Replace takeoff with the emergency room.

And you'll see that the vast majority of medical schools are training doctors with plenty of theory and very little practice.

Not that theory is bad — it's essential. But theory without practice is a potential career risk.

The truth is, if you're considering medical school, that unprepared "pilot" could be you.

That's why I say this is the end of medical school as we know it. Don't get me wrong — what's "over" isn't the profession. What's ending is the era when a diploma alone guaranteed respect and competence.`,
          },
          {
            label: '[ Agitation ]',
            text: `The era of medicine learned only from books and lecture halls is over.

Today, in an increasingly competitive market, with 35,000 new physicians graduating every year, the diploma is just the ticket to the arena. And make no mistake — inside, the competition is fierce.

The traditional system drowns you in theory for 3, 4, even 5 years before letting you touch a real patient.

It's training doctors who freeze at the sound of a siren, professionals who don't know how to act in a cardiac arrest. They embody unpreparedness, fear, insecurity.

At most schools, you only start practice in the 10th semester. By the time you graduate and still have to complete residency, you'll have only 1 or 2 years of real hands-on experience.

And hospitals no longer accept that teaching model. Few want to hire a newly minted doctor who can't do the basics, who lacks the experience and confidence to practice — and it shows in your salary.

It's in that gap between theory and practice that your confidence dies. That's where the fear of making a mistake paralyzes you. That's why so many new graduates feel like frauds — diploma in hand, after years of study.`,
          },
          {
            label: '[ Turn ]',
            text: `You can choose the longer path — traditional medical education with no real practice until the 10th semester — and settle for an entry-level physician salary, often lower than other professionals, even after 6 years and a fortune invested.

Or… you can choose a completely different, innovative teaching method — something very few medical schools in the country offer.

This is Med Ulbra, Ulbra's medical degree program.

A new kind of education, where practice starts in the first semester.

In your 1st semester, while others are still memorizing bone names, you'll already have your first contact with real patients and learn to take a full history.

By your 4th semester, you'll be in supervised shifts and performing procedures many won't see until the end of the program.

By your 8th semester, you'll have a portfolio of hundreds of documented patient encounters and have participated in surgical procedures.

While others are still in the books, you'll be building muscle memory for your brain.

And to build that memory, we created our Realistic Simulation Center — a high-tech environment where you'll experience the adrenaline of emergency care, high- and low-complexity cases, pediatrics. All in a controlled setting. Mistakes become learning, without risking a single life.`,
          },
          {
            label: '[ Proof ]',
            text: `All that preparation translates into results.

Students with early clinical experience like you'll get at Ulbra have up to 340% higher odds of landing the most competitive residency spots. I'm not saying it — the numbers are.

87% of Ulbra graduates secure residency on their first attempt. A rate that far exceeds the national average.

Directors at leading hospitals in the country know the stark difference between a doctor who studied medicine and a doctor who practiced medicine during training.

The Ulbra method is present in Canoas, Porto Alegre, Gravataí, São Jerônimo in Rio Grande do Sul, and in Manaus, Palmas, and Santarém. But the city doesn't matter. What matters is that in every one of them, the philosophy is the same: you don't memorize — you internalize. You don't study to become a doctor. You become one, day by day.`,
          },
          {
            label: '[ Close and CTA ]',
            text: `And that's what your next decision is about.

Do you want to leave school with a diploma… or with real competence?

The time for being a spectator of medicine is over. The future belongs to those who aren't afraid to decide, to act, to lead.

The era of medical school as we know it has come to an end. And the time when a diploma guaranteed competence is gone.

Will you cling to a dying model — or lead the medicine that's just beginning?

Do you have the courage to be what medicine needs… or will you be just one more?

The choice is yours. Spots for next semester are limited. Our method demands small cohorts.

[Demo button: SECURE MY SPOT IN THE MEDICINE REVOLUTION]`,
          },
        ],
        copyNote: '',
        copyCtaText: 'I want to secure my spot in the medicine revolution.',
        copyCtaButton: 'SECURE MY SPOT IN THE MEDICINE REVOLUTION',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'VSL · Educação superior',
      heroTitle: 'VSL para o curso de medicina que forma médicos com prática desde o primeiro semestre.',
      metaStrip: [
        { label: 'Cliente', value: 'Ulbra' },
        { label: 'Entrega', value: 'Roteiro de VSL longa' },
        { label: 'Contexto', value: 'Captação de vestibulandos — curso de medicina Med Ulbra' },
      ],
      briefingHeading: 'O diferencial era técnico. O trabalho foi torná-lo emocional.',
      briefingParagraphs: [
        'O Med Ulbra é o curso de medicina da Ulbra — e tem um diferencial concreto e raro no mercado: 75% da grade dedicada à prática, com contato com pacientes reais já no primeiro semestre. Enquanto a maioria das faculdades só permite prática clínica no décimo semestre, o método Ulbra inverte essa lógica desde o início.',
        'O desafio era transformar esse dado técnico em argumento emocional para um vestibulando que ainda não viveu a frustração do despreparo — mas que tem medo de vivê-la. A VSL foi construída para antecipar esse medo, torná-lo concreto e apresentar o Med Ulbra como a única saída inteligente.',
        'O roteiro segue uma estrutura clássica de VSL longa: gancho por analogia, construção do problema, agitação da dor, virada com apresentação da solução, prova com números e fechamento com urgência. Cada bloco tem função específica na jornada de quem assiste.',
      ],
      copyEyebrow: 'Roteiro de VSL longa — Med Ulbra · Curso de Medicina · Ulbra',
      copyHeadline: 'Uma VSL para fazer o vestibulando sentir, antes de viver, o peso da prática médica.',
      copySub: 'Roteiro estruturado em blocos — do gancho à urgência final.',
      copyParagraphs: [],
      copyList: [],
      copyBlocks: [
        {
          label: '[ Gancho ]',
          text: `AVISO IMPORTANTE: a sua decisão a partir de agora pode definir o seu sucesso como médico. O que você vai ler a seguir é sobre a armadilha que muitos caem — e como você pode evitá-la.

Imagine, por um instante, um piloto de avião que passou anos estudando apenas a teoria do voo.

Ele domina a física, a meteorologia, a engenharia da aeronave. Cada detalhe, cada botão, cada gráfico. Tudo está perfeitamente memorizado. Ele nunca reprovou em uma única matéria.

Só tem um porém: ele também nunca pilotou um avião de verdade.

Um excelente piloto na teoria, mas um completo inexperiente na prática.

E a pergunta que eu tenho para te fazer é: se você precisasse fazer um voo de urgência… você confiaria sua vida a ele na primeira decolagem?`,
        },
        {
          label: '[ Problema ]',
          text: `Eu sei, essa pergunta pode parecer absurda, mas é exatamente essa a perigosa realidade que o sistema tradicional de ensino médico está criando.

Basta trocar o piloto pelo médico. Troque a decolagem pela sala de emergência.

E você verá que a maioria esmagadora das faculdades de medicina está formando médicos com muita teoria, mas com pouca prática.

Não que a teoria seja ruim, pelo contrário, é fundamental. Mas teoria sem prática é um problema em potencial para a sua carreira.

A verdade é que, caso você esteja cogitando fazer uma faculdade de medicina, esse "piloto" despreparado pode ser você.

Por isso, eu afirmo que este é o fim das faculdades de medicina como conhecemos. Não me entenda mal, o que "acabou" não foi a profissão. O que está chegando ao fim é a era em que um diploma, por si só, garantia respeito e competência.`,
        },
        {
          label: '[ Agitação ]',
          text: `Acabou a era da medicina que se aprende só nos livros e nas salas de aula.

Hoje, em um mercado cada vez mais competitivo, com 35 mil novos médicos formados a cada ano, o diploma se tornou apenas o ingresso para a arena. E não se engane — lá dentro, a competição é selvagem.

O sistema de ensino tradicional te afoga em teoria por 3, 4 e até 5 anos antes de te permitir tocar em um paciente de verdade.

Ele está formando médicos que tremem ao ouvir o som de uma sirene, profissionais que não sabem como agir diante de uma parada cardiorrespiratória. Eles são a personificação do despreparo, do medo, da insegurança.

Na maioria das faculdades, você inicia a prática só no 10º semestre. Quando finalmente se formar e ainda precisar fazer a residência, você terá apenas 1 ou 2 anos de experiência prática real.

E os hospitais não aceitam mais essa metodologia de ensino. Poucos querem contratar um médico recém-formado que não sabe fazer o básico, que não tem experiência e confiança para atuar na profissão — e isso se reflete até no seu salário.

É nesse abismo entre teoria e prática que a sua autoconfiança morre. É nele que o medo de errar te paralisa. É por causa dele que tantos recém-formados se sentem uma fraude, mesmo com o diploma na mão, mesmo depois de tantos anos estudando.`,
        },
        {
          label: '[ Virada ]',
          text: `Você pode escolher o caminho mais demorado — com o ensino tradicional da medicina sem prática alguma até o 10º semestre — e se contentar com um salário-base de médico iniciante, muitas vezes até menor do que profissionais de outras áreas, mesmo depois de 6 anos investindo tempo e uma fortuna nos seus estudos.

Ou… você pode escolher uma metodologia de ensino completamente diferenciada e inovadora, algo que pouquíssimas faculdades de medicina no Brasil oferecem.

Este é o Med Ulbra, o curso de medicina da Ulbra.

Um ensino totalmente novo, onde a prática começa no primeiro semestre.

No seu 1º semestre, enquanto outros ainda estão decorando o nome dos ossos, você já terá o primeiro contato com pacientes reais e aprenderá a fazer uma anamnese completa.

No seu 4º semestre, você já estará participando de plantões supervisionados e realizando procedimentos que muitos só verão no final do curso.

No seu 8º semestre, você já terá um portfólio com centenas de atendimentos documentados e terá participado de procedimentos cirúrgicos.

Enquanto outros ainda estão nos livros, você estará construindo uma memória muscular para o seu cérebro.

E para construir essa memória, nós criamos o nosso Centro de Simulação Realística — um ambiente de alta tecnologia onde você vai sentir a adrenalina de atendimentos de emergência, de demandas de alta e baixa complexidade, de pediatria. Tudo em um cenário controlado. O erro se transforma em aprendizado, sem colocar uma única vida em risco.`,
        },
        {
          label: '[ Prova ]',
          text: `Todo esse preparo se traduz em resultados.

Alunos com experiência clínica precoce, como a que você terá na Ulbra, têm até 340% mais chances de conquistar as vagas de residência mais disputadas. Não sou eu quem está dizendo isso. São os números.

87% dos egressos da Ulbra conquistam vagas de residência já na primeira tentativa. Um índice brutal, muito superior à média nacional.

Os diretores dos principais hospitais do Brasil — Sírio-Libanês, Albert Einstein e Moinhos de Vento — sabem a diferença gritante entre um médico que estudou medicina e um médico que praticou medicina durante a formação.

O método Ulbra está presente em Canoas, Porto Alegre, Gravataí e São Jerônimo no Rio Grande do Sul, e também em Manaus, Palmas e Santarém. Mas não importa a cidade. O que importa é que em todas elas, a filosofia é a mesma: você não decora, você internaliza. Você não estuda para ser médico. Você se torna médico, dia após dia.`,
        },
        {
          label: '[ Fechamento e CTA ]',
          text: `E é sobre isso que se trata a sua próxima decisão.

Você quer sair da faculdade com um diploma… ou com competência de verdade?

O tempo de ser um espectador da medicina acabou. O futuro pertence aos protagonistas. Aos que não têm medo de tomar decisões, de agir, de liderar.

A era das faculdades de medicina como conhecemos chegou ao fim. E o tempo do diploma como garantia de competência está morto.

Você vai se apegar a um modelo que está acabando, ou vai liderar a medicina que está apenas começando?

Você tem coragem para ser o que a medicina precisa... ou vai ser apenas mais um?

A decisão é sua. As vagas para o próximo semestre são limitadas. Nosso método exige turmas reduzidas.

[Botão demo: GARANTIR MEU LUGAR NA REVOLUÇÃO DA MEDICINA]`,
        },
      ],
      copyNote: '',
      copyCtaText: 'Quero garantir meu lugar na revolução da medicina.',
      copyCtaButton: 'GARANTIR MEU LUGAR NA REVOLUÇÃO DA MEDICINA',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'ulbra-vsl-psicologia') {
    if (lang === 'en') {
      return {
        pillLabel: 'VSL · Psychology',
        heroTitle: 'VSL for Psychology that turns fear of graduating unprepared into clinical confidence.',
        metaStrip: [
          { label: 'Client', value: 'Ulbra' },
          { label: 'Deliverable', value: 'VSL script' },
          {
            label: 'Context',
            value: 'Psychology recruitment via clinical practice from day one',
          },
        ],
        briefingHeading: 'The fear of graduating was real. The copy had to name it.',
        briefingParagraphs: [
          "The biggest conversion barrier for the Psychology program isn't price or competition — it's fear. The specific, visceral fear of finishing five years of school and not knowing what to do in front of a real patient. That insight drove the entire piece.",
          'The copy opens by naming that fear with surgical precision — before offering any solution. The logic is simple: whoever recognizes themselves in the pain stays. And whoever stays, listens. From there, the narrative takes the reader through identification, blame shifted to the system, and finally Ulbra as the only path that addresses the root problem.',
          'The closing CTA — "I want to be a confident psychologist" — doesn\'t sell the program. It sells the identity shift the reader already wants for herself.',
        ],
        copyEyebrow: 'VSL script · Ulbra Psychology',
        copyHeadline: 'A VSL that turns the fear of graduating into clinical confidence from the first semester.',
        copySub: 'Single piece structured in blocks — from hook to close and CTA.',
        copyParagraphs: [],
        copyList: [],
        copyBlocks: [
          {
            label: '[ Hook ]',
            text: `"My biggest fear in Psychology school wasn't failing a class… it was graduating."

Did that send a chill down your spine?

If so, it's because you know, deep down, that this is the ghost that haunts everyone who dreams of studying Psychology.

It's not the entrance exam… It's not the hard tests…

It's the fear of the day after graduation.`,
          },
          {
            label: '[ Problem ]',
            text: `The fear of the deafening silence in a therapy room…

Imagine: a patient right in front of you, waiting for an answer you spent 5 years studying to give…

And in that moment, the theory vanishes. You realize that in practice, you don't know what to do.

It's the fear of freezing.

If that thought has already kept you up at night, pay close attention.
Because you're about to discover that the blame for that fear isn't yours.

The blame lies with a broken education system.

A model that for decades sold you a dangerous lie…

The lie that knowledge comes before practice. A system that turned you into an exam expert… but left you completely unsure for real life.`,
          },
          {
            label: '[ Agitation ]',
            text: `Picture the scene…

You enter school with your heart full of dreams.

Psychology wasn't a choice — it was a calling. A vocation.

But semester after semester of pure theory, passion starts to give way to exhaustion.

The books pile up. The study nights stretch on.

And the real patient… the one you dreamed of helping… is still a vague promise.

You start to feel further and further from your purpose.

Until one day you look in the mirror and the reflection scares you…

You don't see a future psychologist. You see an exam specialist.

The frustration is so great that the only way out seems to be dropping out…

And the worst part isn't leaving. It's the doubt that keeps hammering in your head, day and night:

"Maybe the problem is me?"

But the problem was never you. It was the method.`,
          },
          {
            label: '[ Turn ]',
            text: `So you decide to try again.

Only this time, with one condition: find a program that makes sense. Where practice isn't a promise for the end of the degree — but the starting point.

That's when you discover Ulbra.

And the promise isn't about the future — it's about now: the security of professional practice from the first semester.

The shift is immediate.

Suddenly the theory comes alive. The words in the books now have a purpose, a face, a real application.

From week one, you're not just a "student."

You're in a clinical setting — inside Ulbra's modern school-clinic — observing real sessions, taking part in case discussions, breathing the profession.

That old insecurity of not knowing what to do disappears.
In its place comes confidence.

You're no longer afraid of "freezing" in front of a patient…

On the contrary — you're eager for the next challenge, the next case, the next chance to learn by doing.

You're growing as a professional in the heat of practice, not in the cold of the books.`,
          },
          {
            label: '[ Proof ]',
            text: `You're not just paying for classes…

You're investing in certainty.

An infrastructure with dozens of therapy rooms, observation labs, and five specialized school-services that prepare you for the real world — not just the final exam.

14 psychologists on the faculty who are in the field, living the challenges you'll face. They won't just teach you theory from the books. They'll teach you the practice of the consulting room, the clinic, and the organizations where they work.

Over 30 years of tradition. Years of refining what works.

A tradition that means training psychologists the market doesn't just accept — it competes for.

An active student body and an academic league taking shape. A living environment, constantly updated by the demands of students and the market.`,
          },
          {
            label: '[ Close and CTA ]',
            text: `Now imagine your future. Your own practice.

That old fear of "freezing" has become your story of overcoming. The story you tell with pride to inspire others.

If that journey sounds familiar… if you feel that same fear and long for that same certainty… then this conversation is for you.

That transformation isn't a miracle. It's the result of a method.

A method that understands that Psychology isn't a science of books — it's a science of people. And to care for people, you need to be close to people. From the start.

That's the teaching method of Ulbra Canoas Psychology.

Enrollment for the entrance exam is open.

You can spend two, three, or even four years buried in theory…

Or you can choose the university that teaches you practice from the first semester.

Spots are limited. Our quality depends on close, attentive supervision in the school-clinic — and we won't compromise on that.

So while you're thinking, someone else with the same calling may be securing the spot that could be yours.

Click the button below. Take the first step so that in five years, your only fear is an overly full schedule.

[I WANT TO BE A CONFIDENT PSYCHOLOGIST]`,
          },
        ],
        copyNote: '',
        copyCtaText: 'I want to be a confident psychologist.',
        copyCtaButton: 'I WANT TO BE A CONFIDENT PSYCHOLOGIST',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'VSL · Psicologia',
      heroTitle: 'VSL para o curso de Psicologia que transforma medo em confiança clínica.',
      metaStrip: [
        { label: 'Cliente', value: 'Ulbra' },
        { label: 'Entrega', value: 'Roteiro de VSL' },
        {
          label: 'Contexto',
          value: 'Captação para Psicologia via argumento de prática clínica desde o 1º semestre',
        },
      ],
      briefingHeading: 'O medo de se formar era real. A copy precisava nomeá-lo.',
      briefingParagraphs: [
        'A maior barreira de conversão no curso de Psicologia não é o preço nem a concorrência — é o medo. O medo específico, visceral, de chegar ao fim de cinco anos de faculdade e não saber o que fazer diante de um paciente de verdade. Esse insight definiu toda a estratégia da peça.',
        'A copy abre nomeando esse medo com precisão cirúrgica — antes mesmo de apresentar qualquer solução. A lógica é simples: quem se reconhece na dor, fica. E quem fica, ouve. A partir daí, a narrativa conduz a leitora por uma jornada de identificação, culpa transferida para o sistema e, finalmente, apresentação da Ulbra como o único caminho que resolve a raiz do problema.',
        'O CTA final — "Quero ser uma psicóloga confiante" — não vende o curso. Vende a transformação de identidade que a leitora já deseja para si mesma.',
      ],
      copyEyebrow: 'Roteiro de VSL · Ulbra Psicologia',
      copyHeadline: 'Uma VSL para transformar o medo de se formar em confiança clínica desde o primeiro semestre.',
      copySub: 'Peça única estruturada em blocos — do gancho ao fechamento e CTA.',
      copyParagraphs: [],
      copyList: [],
      copyBlocks: [
        {
          label: '[ Gancho ]',
          text: `"Meu maior medo na faculdade de Psicologia não era reprovar
numa matéria… era me formar."

Essa frase te causou um arrepio?

Se sim, é porque você sabe, no fundo da alma, que esse é o maior
fantasma que assombra quem sonha em cursar Psicologia.

Não é o vestibular… Não são as provas difíceis…

É o medo do dia seguinte à formatura.`,
        },
        {
          label: '[ Problema ]',
          text: `O medo do silêncio ensurdecedor de uma sala de atendimento…

Imagine: um paciente bem na sua frente, esperando uma solução que
você passou 5 anos estudando para dar…

E nesse momento, a teoria some. Você percebe que, na prática,
não sabe o que fazer.

É o medo de congelar.

Se esse pensamento já tirou o seu sono, preste muita atenção.
Porque você está prestes a descobrir que a culpa desse medo não é sua.

A culpa é de um sistema de ensino falido.

Um modelo que, por décadas, te vendeu uma mentira perigosa…

A mentira de que o conhecimento vem antes da prática. Um sistema
que te transforma em uma especialista em provas... mas te deixa
completamente insegura para a vida real.`,
        },
        {
          label: '[ Agitação ]',
          text: `Idealize a cena…

Você entra na faculdade com o coração cheio de sonhos.

A Psicologia não foi uma escolha — foi um chamado. Uma vocação.

Mas, semestre após semestre de teoria pura, a paixão começa
a dar lugar à exaustão.

Os livros se acumulam. As noites de estudo se estendem.

E o paciente de verdade… aquele que você sonhava em ajudar…
continua sendo uma promessa vaga.

Você começa a se sentir cada vez mais distante do seu propósito.

Até que um dia, você se olha no espelho e o reflexo te assusta…

Você não vê ali uma futura psicóloga. Você vê uma especialista
em fazer provas.

A frustração é tão grande que a única saída parece ser trancar
a faculdade…

E o pior não é trancar a matrícula. É a dúvida que fica martelando
na sua cabeça, dia e noite:

"Será que o problema sou eu?"

Mas o problema nunca foi você. Foi o método.`,
        },
        {
          label: '[ Virada ]',
          text: `Então, você decide tentar de novo.

Só que, desta vez, com uma condição: encontrar uma formação
que faça sentido. Onde a prática não seja uma promessa para
o final do curso, mas o ponto de partida.

É quando você descobre a Ulbra.

E a promessa não é sobre o futuro — é sobre o agora: a segurança
da prática profissional desde o primeiro semestre.

A mudança é imediata.

A teoria, de repente, ganha vida. As palavras dos livros agora
têm um propósito, um rosto, uma aplicação real.

Desde a primeira semana, você já não é apenas uma "aluna".

Você está em um ambiente clínico — dentro da moderna clínica-escola
da Ulbra — observando atendimentos reais, participando de discussões
de casos, respirando a profissão.

Aquela antiga insegurança de não saber o que fazer desaparece.
No lugar dela, nasce a confiança.

Você não está mais com medo de "congelar" diante de um paciente…

Muito pelo contrário — está ansiosa pelo próximo desafio, pelo próximo
caso, pela próxima oportunidade de aprender fazendo.

Você está se desenvolvendo como profissional no calor da prática,
não na frieza dos livros.`,
        },
        {
          label: '[ Prova ]',
          text: `Você não está apenas pagando por aulas…

Está investindo na certeza.

Uma infraestrutura com dezenas de salas de atendimento, laboratórios
de observação e cinco serviços-escola especializados que te preparam
para o mundo real — não apenas para a prova final.

14 psicólogos no corpo docente que estão no mercado, vivendo os
desafios que você irá enfrentar. Eles não vão te ensinar apenas
a teoria dos livros. Vão te ensinar a prática dos consultórios,
das clínicas e das organizações onde eles trabalham.

Mais de 30 anos de tradição. Anos para aperfeiçoar o que funciona.

Uma tradição que significa formar psicólogos que o mercado não apenas
aceita — mas disputa.

Um Centro Acadêmico ativo e uma Liga Acadêmica nascendo. Um ambiente
vivo, constantemente atualizado pelas demandas dos próprios alunos
e do mercado.`,
        },
        {
          label: '[ Fechamento e CTA ]',
          text: `Agora, imagine o seu futuro. O seu próprio consultório.

Aquele antigo medo de "congelar" se transformou na sua história
de superação. A história que você conta com orgulho para inspirar outros.

Se essa jornada soa familiar… se você sente esse mesmo medo e anseia
por essa mesma certeza… então esta conversa é com você.

Essa transformação não é um milagre. É o resultado de um método.

Um método que entende que a Psicologia não é uma ciência de livros,
mas uma ciência de gente. E que, para cuidar de gente, é preciso estar
perto de gente. Desde o início.

Esse é o método de ensino da Psicologia da Ulbra Canoas.

O período de inscrições para o Vestibular já começou.

Você pode ficar dois, três ou até quatro anos atolada em teoria…

Ou pode escolher a universidade que te ensina a prática desde
o primeiro semestre.

As vagas são limitadas. Nossa qualidade depende da supervisão atenta
e próxima na clínica-escola — e não abrimos mão disso.

Isso significa que, enquanto você pensa, outra pessoa com a mesma
vocação pode estar garantindo o lugar que deveria ser seu.

Clique no botão abaixo. Dê o primeiro passo para que, daqui a cinco anos,
o seu único medo seja ter uma agenda cheia demais.

[QUERO SER UMA PSICÓLOGA CONFIANTE]`,
        },
      ],
      copyNote: '',
      copyCtaText: 'Quero ser uma psicóloga confiante.',
      copyCtaButton: 'QUERO SER UMA PSICÓLOGA CONFIANTE',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'campanha-cripto') {
    if (lang === 'en') {
      return {
        pillLabel: 'Launch campaign · Crypto education',
        heroTitle: 'A launch campaign that turns fear of volatility into a rational case for investing in crypto.',
        metaStrip: [
          { label: 'Client', value: client },
          { label: 'Deliverable', value: 'Launch campaign copy for YouTube channel and offer' },
          { label: 'Context', value: 'Crypto education for Brazilians who are tired of hype and want clarity' },
        ],
        briefingHeading: 'Launch a crypto product without sounding like hype.',
        briefingParagraphs: [
          'The audience already knew Bitcoin, volatility and the promise of “getting rich fast”. What they didn’t have was a clear, structured way to enter the market without gambling.',
          'The copy needed to do three things at the same time: lower the emotional noise around crypto, frame it as a long‑term strategy rather than a bet, and position the client as the guide who translates complexity into clear, concrete steps.',
        ],
        copyEyebrow: 'Launch campaign · Crypto education offer',
        copyHeadline: 'Crypto is not a lottery ticket. It’s a strategy — if you know what you’re doing.',
        copySub: 'From fear of volatility to a clear, step‑by‑step plan.',
        copyParagraphs: [
          'Instead of promising “the next coin that will explode”, the copy opens by acknowledging the reader’s exhaustion with this exact kind of promise. The hook is simple: if hype actually worked, everyone would already be rich.',
          'From there, the narrative reframes crypto as one part of a long‑term portfolio, not a magic solution. The pieces show how to separate speculation from strategy, how to define position sizes that let the person sleep at night and how to build a plan that survives cycles of euphoria and panic.',
          'The call to action is not “buy now before it explodes”, but “learn a method that lets you invest without feeling stupid or reckless every time the market moves 10% in a day”.',
        ],
        copyList: [
          'Clear explanation of risk vs. reward in crypto.',
          'Framework to define how much of your portfolio belongs in this asset class.',
          'Positioning of the mentor as someone who actually invests — not just sells courses.',
        ],
        copyNote: '',
        copyCtaText: 'I want a rational plan for investing in crypto.',
        copyCtaButton: 'See how the method works →',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'Lançamento · Educação em cripto',
      heroTitle: 'Uma campanha de lançamento que transforma medo de volatilidade em argumento racional para investir em cripto.',
      metaStrip: [
        { label: 'Cliente', value: client },
        { label: 'Entrega', value: 'Copy de lançamento para canal no YouTube e oferta principal' },
        { label: 'Contexto', value: 'Educação em cripto para brasileiros cansados de hype e promessas vazias' },
      ],
      briefingHeading: 'Lançar um produto de cripto sem soar como promessa milagrosa.',
      briefingParagraphs: [
        'O público já conhecia Bitcoin, volatilidade e a promessa de “ficar rico rápido”. O que ele não tinha era um caminho claro para entrar nesse mercado sem sentir que estava apostando.',
        'A copy precisava fazer três coisas ao mesmo tempo: baixar o ruído emocional em torno de cripto, enquadrar o ativo como parte de uma estratégia de longo prazo — não como bilhete de loteria — e posicionar o cliente como o guia que traduz complexidade em passos concretos.',
      ],
      copyEyebrow: 'Campanha de lançamento · Oferta de educação em cripto',
      copyHeadline: 'Cripto não é bilhete de loteria. É estratégia — se você souber o que está fazendo.',
      copySub: 'Do medo da volatilidade a um plano claro passo a passo.',
      copyParagraphs: [
        'Em vez de prometer “a próxima moeda que vai explodir”, a copy começa reconhecendo o cansaço do leitor com exatamente esse tipo de promessa. O gancho é simples: se hype funcionasse, todo mundo já estaria rico.',
        'A partir daí, a narrativa enquadra cripto como uma parte de um portfólio de longo prazo, não como solução mágica. As peças mostram como separar especulação de estratégia, como definir tamanhos de posição que permitem dormir tranquilo e como construir um plano que sobrevive a ciclos de euforia e pânico.',
        'O convite não é “comprar agora antes de subir”, mas “aprender um método para investir sem se sentir irresponsável ou perdido a cada variação de 10% no dia”.',
      ],
      copyList: [
        'Explicação clara de risco x retorno em cripto.',
        'Framework para definir quanto do patrimônio faz sentido estar nessa classe de ativo.',
        'Posicionamento do mentor como alguém que investe de verdade — não só vende cursos.',
      ],
      copyNote: '',
      copyCtaText: 'Quero um plano racional para investir em cripto.',
      copyCtaButton: 'Ver como o método funciona →',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'ulbra-pos-psicologia') {
    if (lang === 'en') {
      return {
        pillLabel: 'Funnel · Postgraduate in Psychology',
        heroTitle: 'From “afraid to freeze in front of a client” to “confident psychologist with a waiting list”.',
        metaStrip: [
          { label: 'Client', value: 'Ulbra' },
          { label: 'Deliverable', value: 'Full funnel copy for postgraduate program in Psychology' },
          { label: 'Context', value: 'Lead generation for a specialization focused on real clinical practice' },
        ],
        briefingHeading: 'Sell a postgraduate program without sounding like more theory.',
        briefingParagraphs: [
          'Most postgraduate programs in Psychology promise “up‑to‑date content” and “renowned faculty”. The problem is that the audience is not afraid of theory — they are afraid of sitting in front of a real patient and freezing.',
          'The funnel copy reframes the offer around this emotional truth: the specialization is not “more knowledge”, it is the bridge between the degree and the confidence to practice. Each piece — landing page, emails and ads — hits this same nerve from different angles.',
        ],
        copyEyebrow: 'Postgraduate funnel · Ulbra Canoas',
        copyHeadline: 'Postgraduate in Psychology that doesn’t keep you stuck in books — puts you in front of real patients.',
        copySub: 'For the psychologist who is tired of feeling “almost ready”.',
        copyParagraphs: [
          'The main landing page opens with the fear no one admits out loud: having the diploma in hand and still feeling terrified of the first real consultation. From there, the copy connects the structure of the course — supervision, clinic‑school, real cases — with the only result that matters: not freezing when the patient sits in front of you.',
          'The emails deepen this promise with stories of former students and concrete scenes of practice. Instead of listing modules, the copy shows moments: the first time the student leads a session, the supervision that untangles a case, the day they realise “I can really do this”.',
        ],
        copyList: [
          'Landing page focused on fear of practice, not academic features.',
          'Email sequence that turns this fear into a narrative of transformation.',
          'Consistent positioning of Ulbra as the university that teaches Psychology by putting you in the field.',
        ],
        copyNote: '',
        copyCtaText: 'I want to feel ready to sit in front of a patient.',
        copyCtaButton: 'See the postgraduate program details →',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'Funil · Pós-graduação em Psicologia',
      heroTitle: 'Da psicóloga com medo de travar na frente do paciente à profissional confiante com agenda cheia.',
      metaStrip: [
        { label: 'Cliente', value: 'Ulbra' },
        { label: 'Entrega', value: 'Copy completa de funil para pós-graduação em Psicologia' },
        { label: 'Contexto', value: 'Captação de leads para especialização focada em prática clínica real' },
      ],
      briefingHeading: 'Vender uma pós em Psicologia sem soar como “mais teoria”.',
      briefingParagraphs: [
        'A maioria das pós-graduações em Psicologia promete “conteúdo atualizado” e “corpo docente renomado”. O problema é que a dor da audiência não é falta de teoria — é medo de sentar na frente de um paciente real e travar.',
        'A copy do funil inteiro parte dessa verdade emocional: a pós não é “mais conhecimento”, é a ponte entre o diploma e a segurança para atender. Cada peça — landing page, e-mails e anúncios — bate nesse mesmo nervo sob ângulos diferentes.',
      ],
      copyEyebrow: 'Funil de pós-graduação · Ulbra Canoas',
      copyHeadline: 'A pós em Psicologia que não te deixa presa em livro — te coloca na frente de pacientes reais.',
      copySub: 'Para a psicóloga que está cansada de se sentir “quase pronta”.',
      copyParagraphs: [
        'A landing principal abre com o medo que quase ninguém verbaliza: ter o diploma na mão e ainda assim sentir pavor do primeiro atendimento real. A partir daí, a copy conecta a estrutura do curso — supervisão, clínica-escola, casos reais — com o único resultado que importa: não travar quando o paciente senta na sua frente.',
        'Os e-mails aprofundam essa promessa com histórias de ex-alunos e cenas concretas da prática. Em vez de listar módulos, a copy mostra momentos: a primeira vez conduzindo uma sessão, a supervisão que destrava um caso, o dia em que a psicóloga percebe “eu realmente dou conta disso”.',
      ],
      copyList: [
        'Landing page centrada no medo da prática, não nas features acadêmicas.',
        'Sequência de e-mails que transforma esse medo em narrativa de transformação.',
        'Posicionamento consistente da Ulbra como a universidade que ensina Psicologia colocando o aluno em campo.',
      ],
      copyNote: '',
      copyCtaText: 'Quero me sentir pronta para sentar na frente de um paciente.',
      copyCtaButton: 'Ver detalhes da pós →',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'ulbra-cartas-venda') {
    if (lang === 'en') {
      return {
        pillLabel: 'Sales letters · Higher education',
        heroTitle: 'Three sales letters that turn “maybe later” into “I can’t miss this intake”.',
        metaStrip: [
          { label: 'Client', value: 'Ulbra' },
          { label: 'Deliverable', value: 'Sales letters for Psychology, Veterinary Medicine and Speech Therapy' },
          { label: 'Context', value: 'Direct response copy for higher education enrollment' },
        ],
        briefingHeading: 'One university, three courses, three different fears.',
        briefingParagraphs: [
          'The same intake campaign needed to speak to three very different audiences: a future psychologist afraid of freezing in front of a patient; a future vet who wants to work with animals, not just “love them”; and a future speech therapist who doesn’t want to explain their profession at every family dinner.',
          'The brief was clear: each letter had to sound like a one‑to‑one conversation with that specific student — not a generic institutional message.',
        ],
        copyEyebrow: 'Sales letters · Ulbra Canoas',
        copyHeadline: 'Letters that talk to the fear behind the choice — not just to the course description.',
        copySub: 'Psychology, Veterinary Medicine and Speech Therapy, each with its own story.',
        copyParagraphs: [
          'The Psychology letter opens with the image that keeps many students up at night: sitting across from a patient and feeling their mind go blank. From there, it shows how training, supervision and real practice turn this fear into confidence.',
          'The Veterinary Medicine letter speaks to the difference between “liking animals” and being ready to take responsibility for their lives. It shows the hospital, the on‑call shifts and the real‑world exposure the student will have before graduation.',
          'The Speech Therapy letter tackles an invisible fear: choosing a profession that few people understand. The copy positions the course as a way of giving voice — literally — to children, adults and elderly people who are struggling to be heard.',
        ],
        copyList: [
          'Three long‑form letters, each tailored to the emotional truth of the course.',
          'Briefing‑driven structure: hook, story, proof, offer and urgency.',
          'A single, consistent positioning of Ulbra as the university of practice.',
        ],
        copyNote: '',
        copyCtaText: 'I want to read the full letters.',
        copyCtaButton: 'Request the complete material →',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'Cartas de venda · Ensino superior',
      heroTitle: 'Três cartas de venda que transformam o “um dia eu vejo isso” em “não posso perder essa entrada”.',
      metaStrip: [
        { label: 'Cliente', value: 'Ulbra' },
        { label: 'Entrega', value: 'Cartas de venda para Psicologia, Medicina Veterinária e Fonoaudiologia' },
        { label: 'Contexto', value: 'Copy de resposta direta para captação no ensino superior' },
      ],
      briefingHeading: 'Uma universidade, três cursos, três medos diferentes.',
      briefingParagraphs: [
        'A mesma campanha de captação precisava falar com três públicos completamente diferentes: a futura psicóloga com medo de travar na frente do paciente; o futuro veterinário que quer trabalhar com animais, não só “amar animais”; e a futura fonoaudióloga que não quer passar a vida explicando o que faz em cada jantar de família.',
        'O briefing era claro: cada carta precisava soar como uma conversa um‑a‑um com aquele aluno específico — não como mensagem institucional genérica.',
      ],
      copyEyebrow: 'Cartas de venda · Ulbra Canoas',
      copyHeadline: 'Cartas que falam com o medo por trás da escolha — não só com a descrição do curso.',
      copySub: 'Psicologia, Medicina Veterinária e Fonoaudiologia, cada uma com sua própria história.',
      copyParagraphs: [
        'A carta de Psicologia abre com a imagem que tira o sono de muita gente: sentar na frente de um paciente e sentir a mente em branco. A partir daí, mostra como formação, supervisão e prática real transformam esse medo em confiança.',
        'A carta de Medicina Veterinária fala da diferença entre “gostar de animais” e estar pronto para assumir responsabilidade pela vida deles. Mostra o hospital, os plantões, os bastidores que o aluno vai viver antes mesmo de se formar.',
        'A carta de Fonoaudiologia ataca um medo mais invisível: escolher uma profissão que pouca gente entende. A copy posiciona o curso como uma forma de devolver — literalmente — voz para crianças, adultos e idosos que estão lutando para serem ouvidos.',
      ],
      copyList: [
        'Três cartas longas, cada uma espelhando a verdade emocional de um curso.',
        'Estrutura guiada pelo briefing: gancho, história, prova, oferta e urgência.',
        'Um posicionamento único da Ulbra como universidade da prática.',
      ],
      copyNote: '',
      copyCtaText: 'Quero ler as cartas completas.',
      copyCtaButton: 'Pedir o material completo →',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'ulbra-saude-tech') {
    if (lang === 'en') {
      return {
        pillLabel: 'Education · Health & Technology',
        heroTitle: 'Three landing pages for Physiotherapy, Pharmacy and Computer Science, all built around real practice from day one.',
        metaStrip: [
          { label: 'Client', value: 'Ulbra' },
          { label: 'Deliverable', value: '3 LPs — Physiotherapy, Pharmacy and Computer Science' },
          { label: 'Context', value: 'Lead generation for on‑campus and blended programs' },
        ],
        briefingHeading: 'Three programs, three audiences, one argument that never changes: real practice from the start.',
        briefingParagraphs: [
          'All three pieces had the same challenge you always face in higher‑education lead gen: break away from generic institutional copy and speak directly to the fear and desire of someone choosing a degree. Each area has its own fear and its own ambition — and the copy had to honour that.',
          'For Physiotherapy, the angle is emotional and vocational: people who choose this career want to help others, and the LP reinforces that on‑campus practice from the very first semester is what separates a complete professional from someone who only has a diploma.',
          'For Pharmacy, the work was to dismantle the cliché of the pharmacist who “just stands behind a counter” — the copy positions the professional as a key protagonist in the health system. For Computer Science, the strategy was to attack the trap of bootcamps and quick courses head‑on, positioning the bachelor’s as the only training that truly makes the professional future‑proof.',
        ],
        copyEyebrow: 'Landing pages — Physiotherapy, Pharmacy and Computer Science · Ulbra',
        copyHeadline: 'Three landing pages that translate one core promise into three very different stories.',
        copySub: 'Physiotherapy, Pharmacy and Computer Science, each with its own hook, structure and lead.',
        copyParagraphs: [],
        copyList: [],
        copyBlocks: [
          {
            label: 'Physiotherapy — on‑campus program',
            text: `Top‑rated Physiotherapy in MEC · 50+ years training the most sought‑after professionals in the market.

The LP opens by positioning the course as a complete preparation for the future of health: prevention, promotion and education — not just rehabilitation.

From there, it brings the hard proof: maximum MEC score, more than 50 years of tradition at the largest private university in Rio Grande do Sul and a strong promise of real practice —
lab work and clinic‑school — from the first semester.

The core bullets reinforce:
➜ 100% on‑campus classes.
➜ Access to Ulbra’s full infrastructure in Canoas, with state‑of‑the‑art labs and clinic‑school.
➜ Diverse practical experiences across different fields of Physiotherapy from the early semesters.
➜ A curriculum connected to what science proves and what the market demands.

The close is a clear fit statement (“this degree is for those who want a purpose‑driven career helping people, value hands‑on learning and won’t settle for the basics”) and a direct CTA with scarcity: limited seats per cohort and special scholarship conditions of up to 30%.`,
          },
          {
            label: 'Pharmacy — blended program',
            text: `While most health careers are framed around treating disease, the copy opens by reframing the pharmacist as the person who works so that disease often doesn’t appear in the first place.

The LP then expands that promise across three “phases” of the profession:
Phase 1 — industry and public health:
• In food and cosmetics, you guarantee quality and safety at the source.
• In public health and sanitary surveillance, you act as the technical authority that sets and enforces standards.
• In immunobiologics, you are part of the chain that produces vaccines and sera — the greatest preventive tools science has ever created.

Phase 2 — direct care and clinical work:
• In clinical and hospital pharmacy, you work side by side with doctors and nurses to define effective therapies, adjust dosages and monitor safety.
• In clinical analysis labs, your reports inform diagnoses and guide medical decisions.
• In compounding pharmacies, you develop personalised formulations.

Phase 3 — innovation:
• In R&D, you help discover new molecules and therapies for diseases that still have no cure.

The methodological core is “the best of two worlds”: solid scientific base online (flexible EAD platform with masters and PhDs) plus in‑person labs where theory becomes skill. The close reinforces Ulbra’s maximum MEC score, 50+ years of tradition and a CTA for enrolment with up to 30% discount and a promise of an immediate contact from the advisory team.`,
          },
          {
            label: 'Computer Science — blended program',
            text: `The LP starts with the metaphor that there are dozens of “doors” in the tech market — and Computer Science gives you the master key for all of them.

The first section attacks the danger of betting a career on “the language of the moment”. It contrasts short bootcamps and tutorials that only teach a single tool with a full bachelor’s that teaches fundamentals. The core argument: the safest and most lucrative career is not for someone who only knows how to use one tool, but for the professional who knows how to build the tool.

On that basis, the copy explains how a computer scientist becomes future‑proof:
• While others learn just Python or JavaScript, you learn algorithms, data structures and logic — the “chemistry of the ingredients” behind any language.
• That means being able to design and build your own solutions instead of being limited to following recipes.

Then the LP lists what the Ulbra blended program actually delivers:
✅ Ability to develop systems and programs from scratch for any platform.
✅ Skills to implement and manage computer networks for companies of any size, with a focus on security.
✅ Deep command of logic and algorithms to solve complex problems most programmers can’t.
✅ Foundation in AI and data structures to act in the most advanced and best‑paid areas of tech.

The close contrasts “a quick course that gives you a skill” with “a bachelor’s degree that gives you a career”, positioning the diploma as the credential that opens doors to top positions, multinational companies and research and innovation — followed by a CTA inviting the prospect to talk to the team and start their journey as a true architect of technology.`,
          },
        ],
        copyNote: '',
        copyCtaText: 'I want to see the full landing pages for each program.',
        copyCtaButton: 'Request the complete LPs →',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'Educação · Saúde & Tecnologia',
      heroTitle: 'Três landing pages para Fisioterapia, Farmácia e Ciências da Computação com prática real desde o início.',
      metaStrip: [
        { label: 'Cliente', value: 'Ulbra' },
        { label: 'Entrega', value: '3 LPs — Fisioterapia, Farmácia e Ciências da Computação' },
        { label: 'Contexto', value: 'Captação para cursos presencial e semipresencial' },
      ],
      briefingHeading: 'Três cursos, três públicos, um argumento que não muda: prática real desde o início.',
      briefingParagraphs: [
        'O desafio dessas três peças era o mesmo de sempre na captação para ensino superior: fugir do institucional genérico e falar diretamente com a dor e o desejo de quem está escolhendo o curso. Cada área tem seu próprio medo e sua própria ambição — e a copy precisava honrar isso.',
        'Em Fisioterapia, o argumento é emocional e vocacional: quem escolhe essa carreira quer ajudar pessoas, e a LP reforça que a prática presencial desde o 1º semestre é o que separa um profissional completo de um bacharel inseguro.',
        'Em Farmácia, o trabalho foi desconstruir o preconceito de que o farmacêutico "só fica atrás de um balcão" — a copy posiciona o profissional como protagonista do sistema de saúde. Em Ciências da Computação, a estratégia foi atacar diretamente a armadilha dos bootcamps e cursos rápidos, posicionando o bacharelado como a única formação que torna o profissional à prova de futuro.',
      ],
      copyEyebrow: 'Landing pages — Fisioterapia, Farmácia e Ciências da Computação · Ulbra',
      copyHeadline: 'Três landing pages que contam a mesma promessa por caminhos diferentes.',
      copySub: 'Fisioterapia presencial, Farmácia semipresencial e Ciências da Computação semipresencial.',
      copyParagraphs: [],
      copyList: [],
      copyBlocks: [
        {
          label: 'Fisioterapia — presencial',
          text: `Fisioterapia nota máxima no MEC e mais de 50 anos formando profissionais disputados pelo mercado.

A LP abre com a promessa central: uma graduação que prepara você para o mercado com prática desde o 1º semestre e laboratórios de ponta. Em seguida, aprofunda o que significa "preparar para o futuro da saúde":
➔ Prevenção de doenças,
➔ Promoção da saúde,
➔ Educação de pacientes — não apenas reabilitação tradicional.

Depois, a copy mostra a estrutura que sustenta essa promessa:
➔ Aulas 100% presenciais.
➔ Acesso à infraestrutura completa da Ulbra, maior universidade privada do RS.
➔ Laboratórios modernos, tecnologia de ponta e clínica‑escola para aprender na prática.

Os bullets finais reforçam:
✅ Curso com nota máxima no MEC.
✅ Experiências práticas diversificadas desde os primeiros semestres.
✅ Currículo inovador, conectado com ciência e mercado.
✅ Formação em 10 semestres, pronta para atuar.

O fechamento deixa claro para quem é o curso e traz a condição comercial:
para quem quer carreira com propósito, valoriza contato humano e prática, quer aprender com professores experientes e faz questão de uma instituição tradicional. A LP encerra com chamada para garantir a vaga com bolsas de até 30%, formulários e um CTA forte: "Quero garantir minha vaga".`,
        },
        {
          label: 'Farmácia — semipresencial',
          text: `A abertura reposiciona a profissão: enquanto a maioria das carreiras de saúde trata a doença, o farmacêutico atua para que ela sequer exista.

Em seguida, a LP desmonta a visão limitada de "ficar atrás do balcão" e mostra o farmacêutico em três grandes frentes:
FASE 1 — prevenção e políticas públicas:
• Indústria de alimentos e cosméticos, garantindo qualidade e segurança.
• Saúde pública e vigilância sanitária, como autoridade técnica que protege a sociedade.
• Desenvolvimento de imunobiológicos — vacinas e soros.

FASE 2 — cuidado direto:
• Farmácia clínica e hospitalar, em equipe com médicos e enfermeiros.
• Laboratórios de análises clínicas, produzindo laudos que guiam diagnósticos.
• Farmácia magistral, criando formulações personalizadas.

FASE 3 — pesquisa e inovação:
• Desenvolvimento de novos fármacos e terapias para doenças ainda sem cura.

A parte seguinte mostra a metodologia semipresencial como "melhor dos dois mundos":
➔ Base científica em EAD flexível, com mestres e doutores.
➔ Prática consolidada em encontros presenciais em laboratórios de ponta — onde a teoria vira habilidade.

O fechamento ancora a promessa na chancela da Ulbra:
• Diploma de bacharelado reconhecido pelo MEC.
• Nota máxima e mais de 50 anos de tradição.
• Corpo docente qualificado.
E termina com um convite claro para começar uma carreira de prestígio, com condições especiais e até 30% de desconto, sempre reforçando o CTA "Quero fazer minha matrícula".`,
        },
        {
          label: 'Ciência da Computação — semipresencial',
          text: `A headline coloca a metáfora central: o mercado de tecnologia tem dezenas de portas; a Ciência da Computação te dá a chave mestra para todas elas.

Na sequência, a copy ataca a armadilha da especialização precoce:
• Bootcamps que prometem transformar em "programador web" em 6 meses.
• Tutoriais que ensinam a "criar apps".
• A linguagem da moda de hoje que vira tecnologia obsoleta amanhã.

O contraste é claro: a carreira mais segura e lucrativa não é a de quem domina uma ferramenta, mas a de quem sabe construir as ferramentas — alguém que entende fundamentos, algoritmos, estruturas de dados e lógica.

A LP descreve o que o bacharelado semipresencial entrega na prática:
✅ Desenvolver sistemas e programas do zero, para diferentes plataformas.
✅ Implementar e gerenciar redes de computadores, com foco em segurança.
✅ Dominar lógica e algoritmos para resolver problemas que a maioria dos programadores não alcança.
✅ Aplicar inteligência artificial e estruturas de dados para atuar nas áreas mais avançadas e bem pagas da tecnologia.

Por fim, a copy contrapõe:
• "Um curso rápido te dá uma habilidade."
• "Um diploma de Bacharel em Ciência da Computação te dá uma carreira."

Reforça o bacharelado como credencial máxima da área — a que abre portas para cargos altos, vagas em multinacionais e pesquisa — e convida o leitor a preencher o formulário e conversar com a equipe para iniciar a trajetória como verdadeiro arquiteto da tecnologia.`,
        },
      ],
      copyNote: '',
      copyCtaText: '',
      copyCtaButton: '',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'ricos-na-america') {
    if (lang === 'en') {
      return {
        pillLabel: 'Email marketing · Finance for immigrants',
        heroTitle: 'An email that turns a 1935 story into a sales argument for today.',
        metaStrip: [
          { label: 'Client', value: 'Ricos na América' },
          { label: 'Deliverable', value: 'Nurture email' },
          { label: 'Context', value: 'Finance channel for Brazilians in the US' },
        ],
        briefingHeading: 'The argument was hidden in the story. The job was to find it.',
        briefingParagraphs: [
          'Ricos na América is the largest finance channel for Latino immigrants in the United States. The audience is Brazilians living in the US who want to invest smartly in the American market — but still haven’t taken the first step.',
          'The email had one clear goal: show the power of consistent, long‑term investing in dollars without sounding like a hard sales pitch. The solution was to build the whole piece around a real story — Grace Groner, a secretary who turned US$180 into US$7 million by buying three shares of the company she worked for back in 1935.',
          'Storytelling does the heavy lifting: it creates identification, demonstrates the power of compound interest in dollars and connects the reader to the offer naturally, without forcing it. The “sale” only shows up at the end, after the story has already done its work.',
        ],
        copyEyebrow: 'Nurture email — Ricos na América channel',
        copyHeadline: 'Have you ever thought about turning US$180 into US$7 million?',
        copySub: 'Email subject line and main hook of the piece.',
        copyParagraphs: [
          "I know it sounds absurd, but I’m going to prove it’s possible — stay with me until the end of this email.",
          'To do that, we need to go back to 1935, when a very interesting story was unfolding.',
          'Grace Groner, a humble secretary at Abbott Laboratories, a US pharmaceutical company, received a US$180 bonus from her bosses. She decided to use it to buy three shares of the company she worked for.',
          'Grace lived in a small cottage, helped people in need, travelled a lot and led a simple life — but she was disciplined, reinvesting every dividend she received into more shares.',
          'On January 19th, 2010, Grace passed away. After her death, it was revealed that her estate was worth more than seven million dollars — all left to a foundation she had created earlier.',
          'Because she never married and had no children, she made it clear that the income should be used to benefit students at Lake Forest College, funding studies and benefiting more than 1,800 students.',
          'With just US$180 to start, this secretary built a fortune of US$7 million. Now imagine leaving that kind of legacy for your own children.',
          'Imagine giving them a great education, taking care of their health and offering a future where they don’t need to worry about mortgages or financial instability.',
          'That’s what consistency, investing in the world’s biggest market and in a strong currency can do for you and your family.',
          "And here’s the key point: Grace Groner’s story would not have had such a happy ending if she had invested in Brazil.",
          'Unlike the real, the US dollar has been a strong, stable currency, protecting the value of investments and allowing for safer, more consistent growth.',
          'To put it in perspective: Apple alone is worth more than the entire Brazilian stock market. In 2021, Brazil’s GDP was US$1.61 trillion, while Apple’s market cap was around US$3 trillion.',
          'And it doesn’t stop there. Those who chose to invest in the US stock market did very well. While the Ibovespa rose 134.40% over a given period, the S&P 500 climbed 187.5%.',
          'Now I want you to follow this line of thought with me.',
          'Think about your children. Picture them growing up with the peace of mind of knowing their future is secure — that they can choose their dream college without worrying about debt, and that they’ll have the financial freedom to build the life they want, without the weight of mortgages and instability.',
          'You deserve that peace of mind — and your children deserve that safety.',
          'That’s exactly what we do at Ricos na América. We teach Brazilians living in the United States how to invest intelligently and safely in the world’s largest market.',
          'We’re the largest finance channel for Latino immigrants and we want to help you and your family. Because, just like Grace Groner, you have the chance to build a prosperous future for the people who matter most to you.',
          'If you’re ready to transform your children’s future, we’re here to help.',
        ],
        copyList: [],
        copyNote:
          '* Original email included a comparison chart of the S&P 500 vs. Ibovespa as visual proof.',
        copyCtaText: 'Ready to transform your children’s financial future?',
        copyCtaButton: 'I want to invest with Ricos na América →',
        resultMetric: '',
        resultSub: '',
        resultParagraphs: [],
      }
    }

    return {
      pillLabel: 'E-mail marketing · Finanças para imigrantes',
      heroTitle: 'Um e-mail que transforma uma história de 1935 em argumento de venda para hoje.',
      metaStrip: [
        { label: 'Cliente', value: 'Ricos na América' },
        { label: 'Entrega', value: 'E-mail de nutrição' },
        { label: 'Contexto', value: 'Canal de finanças para brasileiros nos EUA' },
      ],
      briefingHeading: 'O argumento já existia na história. O trabalho foi encontrá-lo.',
      briefingParagraphs: [
        'A Ricos na América é o maior canal de finanças para imigrantes latinos nos Estados Unidos. O público são brasileiros que vivem nos EUA e querem investir de forma inteligente no mercado americano — mas ainda não deram o primeiro passo.',
        'O e-mail tinha um objetivo claro: mostrar o poder do investimento consistente em dólar no longo prazo, sem soar como argumento de vendas direto. A solução foi construir a peça inteira em torno de uma história real — Grace Groner, uma secretária que transformou US$180 em US$7 milhões comprando três ações da empresa onde trabalhava em 1935.',
        'O storytelling faz o trabalho pesado: cria identificação, demonstra o poder dos juros compostos em dólar e conecta o leitor à oferta de forma natural, sem forçar. A venda aparece só no final, depois que o argumento já foi vencido pela história.',
      ],
      copyEyebrow: 'E-mail de nutrição — Canal Ricos na América',
      copyHeadline: 'Já pensou transformar US$180 em US$7 milhões?',
      copySub: 'Assunto do disparo e gancho principal do e-mail.',
      copyParagraphs: [
        'Eu sei que parece absurdo, mas vou te provar que é possível, preste atenção em mim até o final deste e-mail.',
        'Para isso, precisamos voltar para 1935, ano em que uma narrativa interessante desenrolava.',
        'Grace Groner, uma humilde secretária da Abbott Laboratories, empresa do ramo farmacêutico dos Estados Unidos, recebeu de seus chefes um bônus de US$180, ela então, resolveu comprar 3 ações da empresa em que trabalhava.',
        'Grace morava em uma casa de campo, ajudava os necessitados, viajava muito e levava uma vida simples, mas disciplinada, reinvestindo todos os dividendos recebidos em mais ações.',
        'Em 19 de janeiro de 2010, Grace morreu. Após sua morte, foi revelado que seu patrimônio totalizava mais de sete milhões de dólares e foi deixado para uma fundação que ela havia estabelecido antes de sua morte.',
        'Como ela nunca se casou e não teve filhos, expressou seu desejo de que a renda fosse usada para beneficiar os alunos do Lake Forest College, financiando estudos e beneficiando mais de 1.800 alunos.',
        'Com apenas US$180 iniciais, a secretária acumulou um patrimônio de 7 milhões de dólares. Agora, imagine poder deixar um patrimônio desse valor para os seus filhos?',
        'Garantir que eles tenham uma educação de qualidade, cuidar da saúde deles, e oferecer um futuro onde eles não precisem se preocupar com hipotecas ou incertezas financeiras.',
        'É isso que constância, investimento no maior mercado do mundo e em uma moeda forte podem fazer por você e sua família.',
        'Para reforçar o que quero dizer: a história da Grace Groner não teria um final tão feliz se ela tivesse investido no Brasil.',
        'O dólar americano, ao contrário do real, tem sido uma moeda forte e estável, protegendo o valor dos investimentos e garantindo um crescimento mais seguro e consistente.',
        'Para você ter ideia, somente a Apple é maior que o mercado brasileiro inteiro. Em 2021, o PIB brasileiro foi de US$ 1,61 trilhão, enquanto que o valor de mercado da empresa é de US$3 trilhões.',
        'E não para por aí! Quem optou por investir na bolsa americana se deu bem. Enquanto o Ibovespa valorizou 134,40% no período, o S&P 500 subiu 187,5%.',
        'Neste momento, quero que me acompanhe neste raciocínio.',
        'Pense nos seus filhos. Imagine-os crescendo com a tranquilidade de saber que o futuro deles está seguro, que poderão escolher a faculdade dos sonhos sem se preocupar com dívidas, e que terão a liberdade financeira para construir a vida que desejam, sem o peso de hipotecas e instabilidade financeira.',
        'Você merece essa tranquilidade, e seus filhos merecem essa segurança.',
        'É exatamente isso que fazemos na Ricos na América. Ensinamos brasileiros que vivem nos Estados Unidos a investir de forma inteligente e segura no maior mercado do mundo.',
        'Somos o maior canal de finanças para imigrantes latinos e queremos ajudar você e a sua família. Porque, assim como Grace Groner, você tem a oportunidade de construir um futuro próspero para aqueles que realmente importam para você.',
        'Se você está pronta para transformar o futuro dos seus filhos, estamos aqui para ajudar.',
      ],
      copyList: [],
      copyNote:
        '* Gráfico comparativo S&P 500 x Ibovespa incluído no e-mail original como elemento visual de prova.',
      copyCtaText: 'Pronta para transformar o futuro financeiro dos seus filhos?',
      copyCtaButton: 'Quero investir com a Ricos na América →',
      resultMetric: '',
      resultSub: '',
      resultParagraphs: [],
    }
  }

  if (caseId === 'zenklub') {
    return {
      pillLabel: 'Landing page · Saúde mental',
      heroTitle: (
        <>
          A copy que
          <br />
          converteu <em className="text-amber-accent italic">50%</em>
          <br />
          acima da média.
        </>
      ),
      metaStrip: [
        { label: 'Cliente', value: 'Zenklub' },
        { label: 'Entrega', value: 'Landing page' },
        { label: 'Contexto', value: 'Evento online — Dia das Mães' },
      ],
      briefingHeading: 'O problema não era o produto. Era o texto.',
      briefingParagraphs: [
        'O Zenklub realiza eventos online sazonais voltados a cuidadores, profissionais de RH e pessoas em jornada de saúde mental. O evento de Dia das Mães já tinha histórico — mas a página existente descrevia o evento como produto: listava benefícios, tinha um botão, funcionava. Só não convertia bem.',
        'O problema era de posicionamento. A copy tratava o visitante como alguém que precisava ser convencido — quando a pessoa que chegava naquela página já queria participar. Ela só precisava de uma razão emocional para clicar. A copy nova partiu do estado emocional do visitante, não das features do evento.',
      ],
      copyEyebrow: 'Landing page — Evento online Dia das Mães · Zenklub',
      copyHeadline: 'Este Dia das Mães, dê a ela o que ela mais precisa — não o que é fácil de dar.',
      copySub: 'Um presente que ela vai sentir. Não guardar numa gaveta.',
      copyParagraphs: [
        'Você sabe como é. O Dia das Mães se aproxima e a pressão começa: flor, jantar, perfume. Itens que dizem "eu lembrei". Mas raramente dizem "eu sei o que você está carregando".',
        'Este evento foi pensado para isso. Para a mãe que cuida de todo mundo e esquece de cuidar de si. Para a filha que quer fazer algo que realmente chegue. Para quem quer marcar uma data — não só comemorá-la.',
      ],
      copyList: [
        'Uma conversa sobre saúde emocional conduzida por especialistas do Zenklub',
        'Ferramentas práticas para quem cuida — e para quem é cuidado',
        'Um espaço para sentir. Não só consumir conteúdo.',
      ],
      copyNote: 'Gratuito. Online. No dia em que isso faz mais sentido.',
      copyCtaText: 'Quero participar — e levar quem eu amo junto.',
      copyCtaButton: 'Garantir minha vaga →',
      resultMetric: '+50%',
      resultSub: 'de conversão comparado às campanhas anteriores do mesmo evento',
      resultParagraphs: [
        'Mesmo produto, mesma audiência, mesmo investimento em tráfego. A única variável modificada foi a copy.',
        'O delta de performance é direto — sem mudança de canal, oferta ou criativo visual. O que converteu foi a maneira como o evento foi apresentado.',
      ],
    }
  }

  // Placeholder para todos os outros cases — editar depois
  if (lang === 'en') {
    return {
      pillLabel: title.split(' ').slice(0, 2).join(' ') + ' · Case',
      heroTitle: title,
      metaStrip: [
        { label: 'Client', value: client },
        { label: 'Deliverable', value: title },
        { label: 'Context', value: `Project ${shortTitle}` },
      ],
      briefingHeading: `The challenge ${client} needed to solve.`,
      briefingParagraphs: [
        '[Briefing text — project and client context. Why this work was requested and what the situation was before.]',
        '[Second paragraph — problem diagnosis (positioning, copy, funnel, etc.) and how the copy approach changed the outcome.]',
      ],
      copyEyebrow: `${title} · ${client}`,
      copyHeadline: '[Main headline of delivered copy — replace with real text.]',
      copySub: '[Subheadline or emotional hook.]',
      copyParagraphs: [
        '[First paragraph — context or opening.]',
        '[Second paragraph — argument or benefits.]',
      ],
      copyList: [
        '[Item 1 — benefit or offer element]',
        '[Item 2 — benefit or offer element]',
        '[Item 3 — benefit or offer element]',
      ],
      copyNote: '[Note or copy closing, if any.]',
      copyCtaText: '[Main call to action text.]',
      copyCtaButton: '[CTA Button] →',
      resultMetric: '+XX%',
      resultSub: '[Main metric or result — e.g. conversion, open rate.]',
      resultParagraphs: [
        '[Paragraph explaining the result and the variable that changed (the copy).]',
        '[Follow-up — business impact or project takeaway.]',
      ],
    }
  }

  return {
    pillLabel: title.split(' ').slice(0, 2).join(' ') + ' · Case',
    heroTitle: title,
    metaStrip: [
      { label: 'Cliente', value: client },
      { label: 'Entrega', value: title },
      { label: 'Contexto', value: `Projeto ${shortTitle}` },
    ],
    briefingHeading: `O desafio que ${client} precisava resolver.`,
    briefingParagraphs: [
      `[Texto do briefing — contexto do projeto e do cliente. Por que esse trabalho foi solicitado e qual era a situação antes.]`,
      `[Segundo parágrafo — diagnóstico do problema (posicionamento, copy, funil, etc.) e como a abordagem da copy mudou o resultado.]`,
    ],
    copyEyebrow: `${title} · ${client}`,
    copyHeadline: '[Headline principal da copy entregue — substituir pelo texto real.]',
    copySub: '[Subheadline ou gancho emocional.]',
    copyParagraphs: [
      '[Primeiro parágrafo da copy — contexto ou abertura.]',
      '[Segundo parágrafo — desenvolvimento do argumento ou benefícios.]',
    ],
    copyList: [
      '[Item 1 — benefício ou elemento da oferta]',
      '[Item 2 — benefício ou elemento da oferta]',
      '[Item 3 — benefício ou elemento da oferta]',
    ],
    copyNote: '[Nota ou fechamento da copy, se houver.]',
    copyCtaText: '[Texto do call to action principal.]',
    copyCtaButton: '[Botão CTA] →',
    resultMetric: '+XX%',
    resultSub: '[Métrica ou resultado principal — ex.: de conversão, de abertura, etc.]',
    resultParagraphs: [
      '[Parágrafo explicando o resultado e a variável que mudou (a copy).]',
      '[Complemento — impacto no negócio ou aprendizado do projeto.]',
    ],
  }
}

