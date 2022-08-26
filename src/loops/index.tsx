import { ReactNode } from "react";
import { Effect, Pause, Pace } from "windups";
import { MusicTracks, playSFX, Sprites } from '../assets';

export type LoopInstance = {
    id: string,
    animation: Sprites;
    options: DialogueChain[],
    enables: LoopInstance[],
    music: MusicTracks;
};
export type DialogueChain = {
    text: string;
    second: (flags: string[], loops: LoopInstance[]) => ReactNode[];
    first: (flags: string[], loops: LoopInstance[]) => ReactNode[];
    flag?: string;
    animation: Sprites;
};

const foraging: LoopInstance = {
    id: "foraging",
    animation: "smile",
    music: "ambient",
    enables: [],
    options: [
        {
            text: "Mushroom",
            animation: "smile",
            second: () => [
                "You feel like you should start with simpler foraging.",
            ],
            first: () => [
                <>
                    Moving on, you feel up to the challenge of foraging some
                    mushrooms.
                </>,
                <>
                    After sorting through the common shrooms, you happen upon a
                    shelf mushroom you don't quite recognize.
                </>,
                <>"What kind of fungi is this? It smells fine."</>,
                <>
                    Kaiisse takes the mushroom from the bark. You gently stop
                    him from taking a bite.
                </>,
                <>
                    "Why not? My kin are highly resistant to poisons. The worst
                    of it will be a stomachache. The <em>mana</em> in our blood
                    chases away all toxins. <em>Mana</em> accounts for many
                    things, you will find."
                </>,
                <>"It's not an excuse? It's the truth!"</>,
                <>
                    You take the mushroom from him. You shake your head while
                    discarding it.
                </>,
                <>"Very well. I will defer to your judgment."</>,
                <>
                    To make up taking away his treat, you find as many mushrooms
                    as you can in your remaining time, and feed him the tastiest
                    morsels.
                </>,
                <>
                    You almost don't notice when you're transported back to the
                    clearing.
                </>,
            ],
        },
        {
            text: "Flower",
            animation: "smile",
            second: () => [
                "You've picked all the flowers there are to pick here. Maybe something else is available in the forest?",
            ],
            first: () => [
                <>
                    You notice Kaiisse plucking flowers from the ground and
                    bushes.
                </>,
                <>Shrugging, you busy yourself with plucking herbs.</>,
                <>"Here!"</>,
                <>Kaiisse drapes a chain of daisies on your head.</>,
                <>
                    "A small gift from me to you. If I may be so bold, it rather
                    suits you."
                </>,
                <>
                    You only manage to tear your gaze away from his when a petal
                    flutters past your eyes. Noticing the source of the
                    distraction, you pluck a rose at the peak of its bloom off a
                    nearby bush. Approaching Kaiisse, you place it in the crook
                    of his horn.
                </>,
                <>"Oh! Thank you. Do I look nice?"</>,
                <>You nod, and Kaiisse beams.</>,
                <>
                    "If you wish to decorate my horns, feel free. I do not mind
                    it."
                </>,
            ],
        },
        {
            text: "Fruit",
            animation: "surprise",
            second: () => [
                "You don't find any more fruit in the area. Maybe there's something else you can harvest though.",
            ],
            first: () => [
                <>
                    You spot a crabapple tree. Reaching up, you pluck a ripe
                    fruit. Kaiisse takes another.
                </>,
                <>"It is somewhat… bitter. It would not be my first pick."</>,
                <>
                    You finish your first apple. Dropping the core, you grab
                    another.
                </>,
                <>
                    "I admit, there is a refreshing quality to the bitterness."
                </>,
                <>
                    The two of you enjoy the fruit quietly. You wipe your mouth
                    and pluck a few more. You offer Kaiisse one last crabapple.
                </>,
                <>"Thank you."</>,
                <>The rest go into your bag. You continue on and wipe your hands of crabapple juice.</>,

            ],
        },
    ],
};

const cooking2: LoopInstance = {
    id: "cooking2",
    animation: "laugh",
    music: "flute",
    enables: [],
    options: [
        {
            text: "Meat",
            animation: "smile",
            second: () => [
                <>"You want to eat meat? I will be right back then."</>,
            ],
            first: () => [
                <>The smoked meat is sweet with a sage-like taste.</>,
                <>"Is it not good?"</>,
                <>
                    You try another bite, gnawing through the tough exterior.
                    The smoke flavor is very strong.
                </>,
                <>
                    "My people prize aroma over flavor. A good meat will be
                    fragrant and strong. This one is good, but it didn't have
                    time for the scent to sink in. If only we had the proper
                    tools! Then we could both cook a meal to the best of our
                    ability, each of our dishes complimenting the other."
                </>,
                <>
                    "Still, I am glad to share these things with you. With my
                    kin in dwindling numbers… <Pause ms={350} /> It is hard to
                    enjoy the things of my whelpling days.
                </>,
                <>While the flavor is intense, it isn't unpleasant. The two of you enjoy your meal in the time you have left before the loop claims you again.</>
            ],
        },
        {
            text: "Smoke",
            animation: "smile",
            flag: "smoke",
            second: (flags) => [
                flags.includes("embers")
                    ? `"The only thing left is to put these on the fire."`
                    : `"We'll need embers to light these up."`,
            ],
            first: (flags) => [
                <>Kaiisse gestures with the wood under his left arm.</>,
                <>"This is the magic ingredient!"</>,
                <>"Your people call this wood Dragonwood."</>,
                <>
                    "I had not expected to find it here. But it seems I am
                    lucky! My people desire this wood for the scent that it
                    imparts on meat."
                </>,
                <>You eye the sweet-smelling wood.</>,
                <>
                    "One of my sisters had such a strong fondness for it. So
                    much so that she carried its leaves. Dried leaves make for a
                    small treat. But the true treat was smoked deer."
                </>,
                <>He gestures with the deer in his other arm.</>,
                <>
                    "That's what this is for.{" "}
                    {!flags.includes("embers")
                        ? "Will you help me start a fire?"
                        : ""}{" "}
                    I am unsure if you will enjoy it. But it is worth a try! "
                </>,
            ],
        },
        {
            text: "Ember",
            animation: "smile",
            second: () => [
                "The fire is ready. All that's left to do is wait for the meat to smoke.",
            ],
            first: () => [
                <>
                    Kaiisse starts a fire with small licks of flame. With each
                    breath, the low fire glows. Why did he even ask you to help
                    if all he was going to do was show off?
                </>,
                <>
                    "It has been a while. Not often I get the chance to cook. …
                    The expert cooks of my people tend embers. For years, if
                    that is what it took. A singular focus on their craft. I
                    heard tales that they would unite it to their breath. That
                    way, they would stoke the flame even as they slept!"
                </>,
                <>Kaiisse pauses to breathe into burning wood.</>,
                <>
                    "The passage of years let the smoke develop. Not just one
                    smoke, but many. Multiple woods burning often makes for a muddled
                    taste. However, skilled cooks would layer it to create a scent unable to be replicated by any single wood. I have nowhere near a fraction of their skill now, but I hope that you enjoy my work."
                </>,
            ],
        },
    ],
};

const cooking: LoopInstance = {
    id: "cooking",
    animation: "smile",
    music: "flute",
    enables: [cooking2],
    options: [
        {
            text: "soup",
            animation: "smile",
            second: () => [
                <>You wish for soup? I will gather ingredients post-haste.</>,
            ],
            first: (flags) => [
                <>
                    Into a pot goes a chunk of dried meat. You add some herbs,
                    {flags.includes("mushroom") ? " some mushrooms," : ""} and a
                    few flakes of your rock salt.
                </>,
                <>"The smell is delicious already."</>,
                <>
                    You stir the soup. As it bubbles, you gesture for Kaiisse to
                    sit with you. He does, draping his cape over himself.
                    Eventually you judge the soup finished.
                </>,
                <>
                    "This is interesting! It has a curious flavor. It is the
                    herbs? I cannot tell if I enjoy it. The aroma of it is
                    stronger than expected. No matter my preference, it is hearty and filling.
                    Thank you for the meal."
                </>,
            ],
        },
    ],
};

const flight: LoopInstance = {
    id: "Flight",
    animation: "dragon",
    music: "piano",
    enables: [],
    options: [
        {
            text: "Clouds",
            animation: "dragon",
            second: () => [
                <>"You wish to see the clouds do you not? Hop on then."</>,
            ],
            first: () => [
                <>
                    Kaiisse rises, breaking through the cloud layer. You reach
                    out, condensation collecting on your fingers.
                </>,
                <>"You know, my sire once told me a story."</>,
                <>"He said that dragons came from the clouds."</>,
                <>"Shall I tell it to you?"</>,
                <>
                    "The first god pulled down the skies. When it did, it tore
                    the horizon open. Thus came the clouds. The first god could
                    not shoo them away. So it made a torch to burn away the
                    clouds. Only for those clouds to steal the flame. Making
                    away with fire, the clouds tended to it. The flame grew
                    within the skies and came the first dragon."
                </>,
                <>"Is it true? I am unsure."</>,
                <>
                    The two of you enjoy the view from the sky until the sun
                    grows and swallows your reality.
                </>,
                <>
                    Once again, you're back in the familiar clearing, with the
                    familiar figure on the dais.
                </>,
            ],
        },
        {
            text: "Flight",
            animation: "dragon",
            second: () => [
                <>"You wish to go again? Well who am I to say no to you. Hold on!"</>,
            ],
            first: () => [
                <>
                    Kaiisse, suprisingly, is in dragon form. He crouches down,
                    offering you his back.
                </>,
                <>"Come. I want to show you the skies."</>,
                <>
                    Kaiisse climbs through the air. The trees are dots below you
                    and the air is getting thinner. Kaiisse's scales are rough
                    against your hands. You urge him to go faster, and he
                    obliges, jetting forward with a powerful wingbeat.
                </>,
                <>"Hah! Hold fast and prepare yourself."</>,
                <>
                    You cling on for dear life as Kaiisse tucks his wings and
                    spins, barreling through the air with absurd grace for a
                    creature of his size.
                </>,
                <>
                    "I hope you are not dizzy! There is more I would show you…
                    Alas, you may slip. Still, I hope this small taste of flight was
                    satisfactory."
                </>,
            ],
        },
    ],
};

const forging: LoopInstance = {
    id: "forging",
    animation: "idle",
    music: "ambient",
    enables: [],
    options: [
        {
            text: "Blood",
            animation: "idle",
            second: () => [
                <>
                    "Forging with my blood? We'll need a workshop and molds
                    first."
                </>,
            ],
            first: () => [
                <>
                    Kaiisse's blood bubbles in the forge hearth. It flows
                    thickly, akin to a metal. Unlike your gleaming bow,
                    dragonsblood is pitch black.
                </>,
                <>"Remember to stir it often."</>,
                <>
                    "I am no smith. But I studied the blade. One who wields a
                    blade should understand its making. And I remember enough of
                    godsblood weapons to enchant one."
                </>,
                <>
                    "Admittedly, my knowledge is only theoretical, but it is
                    better than nothing!"
                </>,
                <>
                    "Both godsblood and dragonsblood are thick. Mana courses so
                    strongly through it. Same as how hot steel is more pliable,
                    awoken <em>mana</em> is more receptive to workings."
                </>,
                <>
                    You help Kaiisse pour the blood in. It runs through the
                    mold, overflowing. Kaiisse carelessly brushes away the
                    excess.
                </>,
                <>
                    "Bloodresin must be set with an element. Without it, it
                    shall not hold shape. But once set, it hardens and holds
                    shape. A mold does the job of both serving as a conduit and
                    a shape."
                </>,
                <>
                    Lightly scratching runes into the mold, Kaiisse leans
                    forward. The runes glow as he channels magic through it.
                </>,
                <>
                    After the blood cools and the blade extracted, Kaiisse
                    examines the blade.
                </>,
                <>
                    "There are imperfections in the resin. Some air has been
                    trapped in the resin. Hand me that hammer."
                </>,
                <>
                    Kaiisse sets the blade on an anvil. With a bright flash and
                    a clang, he strikes. You don't notice a difference, but
                    Kaiisse frowns.
                </>,
                <>
                    "This edge is imperfect. I imagine not terribly so, yet…{" "}
                    <Pause ms={400} />
                    There must be some way of evening this edge."
                </>,
                <>You edge closer to compare the dragonsblood to your bow.</>,
                <>
                    Compared to your flawlessly smooth bow, the sword appears
                    much more uneven. Kaiisse works the surface of the blade
                    with the hammer, but there's only so much he can do.
                </>,
                <>"I suppose that will do."</>,
                <>"While imperfect, it is still amazing what we did today."</>,
                <>"We had long theorized that this was possible, but without the recipe for blood-resin, we had no way of confirming our theories.</>,
                <>You fall asleep to the sound of Kaiisse's hammer blows.</>,
                <>When you wake up, you're back in the clearing with a familiar figure up ahead.</>,
            ],
        },
        {
            text: "Mold",
            animation: "idle",
            second: () => [
                "The preparations are done. All that's left is to add the blood.",
            ],
            first: () => [
                <>Kaiisse takes you to a nearby smithy. It seems recently abandoned.</>,
                <>He finds a blade mold from among the scattered tools and blanks.</>,
                <>"You know the recipe for blood-resin?"</>,
                <>You nod, and do your best to indicate the ingredients that Kaiisse will need.</>,
                <>It takes a bit of trial and error, but eventually the two of you create a batch of resin.</>,
                <>All it needs is some blood to cure.</>
            ]
        },
    ],
};

const spar2: LoopInstance = {
    id: "spar2",
    animation: "smile",
    music: "plucky",
    enables: [],
    options: [
        {
            text: "Trick",
            animation: "smile",
            second: () => [
                <>You consider your options.</>,
                <>
                    You have a far-fetched plan, but feel like you should try a
                    weapon first.
                </>,
                <>If nothing so that you can catch him off guard.</>,
            ],
            first: () => [
                <>
                    This time, you approach Kaiisse barehanded. Shifting into a
                    fighting stance, you smile.
                </>,
                <>Hah! Very well. I will indulge you.</>,
                <>
                    Kaiisse moves, reaching for you, confident in his sheer
                    power despite his lack of technique.
                </>,
                <>Unfortunately for him, he can't grab what isn't there.</>,
                <>
                    You skirt his grasp, duck under the flare of his cape, and
                    tackle him by the waist.
                </>,
                <>
                    Unfortunately, his confidence wasn't unwarranted, and he
                    takes the impact like a brick wall.
                </>,
                <>He pries you off, gently tossing you onto your back.</>,
                <>"You are playing a trick on me again!"</>,
                <>Kaiisse considers your prone form before flopping on you.</>,
                <>
                    "You played a trick on me, so it is only fair that I pay you
                    back in kind!
                </>,
                <>
                    He's so heavy that it's hard to breathe. Wheezing, you tap
                    him twice.
                </>,
                <>
                    "Hah! Now you cry mercy? Up on your feet then. How you have
                    so much energy for trickery… <Pause ms={300}/> Never change."
                </>,
                <>Kaiisse fades away, and you return to the clearing once again.</>
            ],
        },
        {
            text: "Sword",
            animation: "smile",
            flag: "sword",
            second: () => [
                <>
                    You don't have that anymore, and you don't want to repeat
                    that experience.
                </>,
                <>Okay, maybe just a bit. But not enough to try that again.</>,
            ],
            first: (_, loops) => [
                <>
                    You take the sword into your hands. It's heavier than you
                    are used to, with a longer reach and a shorter swing.
                </>,
                <>
                    {loops.includes(forging)
                        ? "As fine as this blade is, it can't compare to a blood-forged blade."
                        : ""}{" "}
                    It doesn't matter though; you settle into the only sword
                    stance you remember and prepare for a fight.
                </>,
                <>
                    Kaiisse shifts into a defensive position. You take that asx
                    your cue to strike first, steel meeting steel with your
                    trademark swiftness.
                </>,
                <>"Very good!"</>,
                <>With a barking laugh, Kaiisse pushes you back.</>,
                <>"But not good enough."</>,
                <>
                    Kaiisse swings, steel grazing your chest as you leap back.
                    You run away from his swings, forgetting how fast he closes
                    in.
                </>,
                <>
                    "No quarter! Stand your ground! Face me head on, and taste
                    your fear."
                </>,
                <>
                    You put up a good fight, but it's clear you're outmatched.
                    Kaiisse eventually gets close and <em>twists</em>, sending
                    your blade flying.
                </>,
                <>
                    "For a weapon you are unused to, you fought valiantly! That
                    was a bout that any warrior would be proud of!"
                </>,
            ],
        },
        {
            text: "Bow",
            animation: "smile",
            flag: "bow",
            second: () => [
                <>
                    You don't feel the need to rub your victory in. You're a
                    gracious winner, after all.
                </>,
            ],
            first: () => [
                <>
                    You draw your bow as Kaiisse slings his quiver over his
                    shoulder. You don't wait to dart off into the thick canopy.
                    When you think you've lost him, you turn around and nock an
                    arrow, preparing for the next step.
                </>,
                <>
                    When Kaiisse appears, you draw and release in the blink of
                    an eye. He dodges out of the way, as expected of the
                    legendary dragon.
                </>,
                <>"You are quick!"</>,
                <>
                    You respond with another arrow. Kaiisse catches this one and
                    looks to where you shot it from, but you're already long
                    gone.
                </>,
                <>
                    Kaiisse may be powerful, but he can't find you as you harass
                    him and constantly reposition without tearing the forest
                    down. His brilliant red hair works against him, allowing you
                    to keep track of him with minimal effort
                </>,
                <>
                    Eventually, you corner Kaiisse and plant two arrows in the
                    tree next to his neck.
                </>,
                <>
                    "A good tracker and an excellent shot. You are a formidable
                    enemy. I could barely keep up!"
                </>,
                <>"This bout is your win by far."</>,
            ],
        },
    ],
};

const spar: LoopInstance = {
    id: "spar",
    animation: "smile",
    music: "plucky",
    enables: [spar2],
    options: [
        {
            text: "Fight",
            animation: "smile",
            second: () => [
                <>"Challenging me to a spar are you?"</>,
                <>"Give me a moment to limber up."</>,
            ],
            first: () => [
                <>You draw your bow at last, chuckling to yourself.</>,
                <>
                    Kaiisse's serpentine eyes glimmer. <Pause ms={2000} /> He
                    moves first.
                </>,
                <>
                    His blade swipes through the space you were moments ago. You
                    nock and pull your bow, releasing an arrow that flies
                    straight and true.
                </>,
                <>
                    Kaiisse dodges by rolling, launching himself at you
                    ballistically.
                </>,
                <>"Even in this weakened form of mine, We are well matched!"</>,
                <>"But who will tire first?"</>,
                <>Sparring Kaiisse is more a chase than a fight.</>,
                <>
                    Your sandals put distance between you two that he easily
                    crosses. His draconic strength splinters tree trunks where
                    you escape his weapon. In the heat of the battle, you
                    stumble.
                </>,
                <>
                    Just in time, you bring up your bow to block Kaiisse's
                    strike. You wince as the flat of his blade smashes into it.
                </>,
                <>
                    If you didn't know better, you'd think he was trying to kill
                    you.
                </>,
                <>"Hah! How invigorating!"</>,
                <>
                    "I see you are more of a skirmisher than a warrior! Trickery
                    and agilities are your tools of choice."
                </>,
                <>"A good fit for someone with as much cunning as you."</>,
                <>"But you lack raw strength and stamina."</>,
                <>Kaiisse grins, sharp and feral.</>,
                <>"Let us see if I can beat some in you! Again!"</>,
                <>You and Kaiisse clash for what feels like hours.</>,
                <>
                    Despite the burning in your muscles, you can't wipe the
                    smile off your face.
                </>,
                <>
                    The loop seems to last longer this tume, but it does end.
                    You don't even notice this time, lying next to Kaiisse in
                    the grass, exhausted in the best kind of way.
                </>,
                <>
                    As you find yourself in the clearing once again, your aches
                    and pains gone and your mind refreshed, Kaiisse gives you a
                    big grin.
                </>,
                <>You return it.</>,
            ],
        },
        {
            text: "Trick",
            animation: "smile",
            second: () => [
                <>
                    You consider trying it again, but Kaiisse seems like he's
                    seen right through you.
                </>,
                <>Maybe a head-on approach would work better?</>,
            ],
            first: () => [
                <>Kaiisse drops down from the dais, preparing for a spar.</>,
                <>
                    You watch his approach warily. Even in this form, you'd be
                    at a disadavantage in raw power.
                </>,
                <>
                    Instead, you relax your stance and begin walking towards him
                </>,
                <>Suprised, he lets you approach.</>,
                <>
                    Your faces are almost touching when you step inside his
                    guard and disarm him, throwing Kaiisse to the ground and
                    relieving him of his blade.
                </>,
                <>"Ah! Trickery!"</>,
                <>You laugh.</>,
                <>
                    Kaiisse twists in your grip, his superior strength making
                    rolling you over a breeze. You respond by kicking him in the
                    chest to try to make some distance.
                </>,
                <>
                    He doesn't let you go. "Is this to be a contest of wills,
                    then?"
                </>,
                <>
                    You squirm past Kaisse. Your fingers dig into his cloak,
                    seeking the clasp. He stands upright then, easily supporting
                    your weight.
                </>,
                <>"Hah! You are caught."</>,
                <>
                    Kaiisse seems pleased with himself. You give up on unhooking
                    his cloak.
                </>,
                <>
                    "My scales do not come off so easy. I would be ashamed to
                    call myself a dragon if they did!"
                </>,
                <>
                    "Hah! Were you not aware? No, no, this is not decorative
                    armor. Both are my scales, as is my collar and my limbs. It
                    is my armor and my skin both."
                </>,
                <>He retrieves his sword.</>,
                <>"That was a fine trick you just played. But no more tricks, I want to face you head-on!"</>
            ],
        },
    ],
};

const dance2: LoopInstance = {
    id: "dance",
    animation: "dragon",
    music: "mando",
    enables: [],
    options: [
        {
            text: "Dance",
            animation: "dragon",
            second: () => [
                <>
                    "If I am to show you this, we will need to take to the
                    skies!"
                </>,
            ],
            first: () => [
                <>
                    You and Kaiisse take to the air. Kaiisse begins to circle
                    your drake.
                </>,
                <>"Follow me. Do not worry. Let our wingtips touch."</>,
                <>
                    He leads your drake into a lazy spin. Sitting astride the
                    drake, you keep your eyes on Kaiisse's.
                </>,
                <>
                    Like a rumbling, Kaiisse begins a song. His voice carries
                    clear over the forest and echos through the sky.
                </>,
                <>
                    Kaiisse rolls leisurely, urging you to follow. Your lungs
                    burn as you spiral through the cloudy mist. You and Kaiisse
                    peel away from each other in tandem. As the plunge begins,
                    you instinctively close your eyes. Despite all the dangers
                    you've been through, it's still exhilarating and terrifying.
                </>,
                <>As you level out, Kaiisse's song draws to a close.</>,
                <>"That was a simple dance of my kin."</>,
                <>
                    "I admit, it is difficult to do this with a human. But I
                    hope you enjoyed it."
                </>,
                <>
                    "After all, you taught me your human dance. This is one of
                    the few dances I remember."
                </>,
                <>
                    "In summer, all my kin would gather. We would dance, up to
                    four of us a ring!""
                </>,
                <>
                    "But <Pause ms={1000} /> I much prefer the dance we shared."
                </>,
                <>The two of you stay up there for some time.</>,
                <>
                    The last thing you remember is the peach color of the sunset
                    before you're back in the clearing once again.
                </>,
            ],
        },
        {
            text: "Fly",
            animation: "dragon",
            second: () => [
                <>
                    You glide through the skies some more, continuing to be in awe. You've
                    flown through the air before, but this is still new for you.
                </>,
            ],
            first: (flags) => [
                ...(flags.includes("flight")
                    ? [<>The drake is much smaller than Kaiisse.</>]
                    : []),
                <>
                    As you ascend, the drake responds to minute shifts in your
                    weight.
                </>,
                <>Soaring above the trees, you point out to the distance.</>,
                <>"A race?"</>,
                <>Kaiisse breathes a short plume of steam.</>,
                <>"I accept!"</>,
                <>
                    Not exactly what you intended, but you're not one to turn
                    such an opportunity down.
                </>,
                <>You lean forward, the drake jetting off.</>,
                <>
                    With a wingbeat that shakes the very air, Kaiisse gives
                    chase.
                </>,
                <>
                    The thin air rushes through your hair as you lead the dragon
                    on a merry chase. Soon, however, a shadow fallsover you.
                </>,
                <>
                    You look up, Kaiisse's massive body blotting out the sun as
                    he overtakes you from above.
                </>,
                <>"It seems I win!"</>,
                <>
                    "A small drake may seem fast, yes. But my wingspan far
                    outmatches even the fastest drakes."
                </>,
                <>
                    "No, I am not the fastest of my kin. In fact, I am slower
                    than many. But still! I am nimble enough to win."
                </>,
                <>
                    Kaiiesse takes the time to stretch his wings. The thick
                    membrane glimmers in the sun. You urge your drake closer.
                    The two of you circle around each other, taking in the view.
                </>,
            ],
        },
    ],
};

const dance: LoopInstance = {
    id: "dance",
    animation: "smile",
    music: "mando",
    enables: [dance2],
    options: [
        {
            text: "Dip",
            animation: "surprise",
            second: () => ["You haven't begun dancing yet!"],
            first: () => [
                <>You slowly guide Kaiisse into dipping you.</>,
                <>
                    He treats you like spun glass, as if the two of you hadn't
                    reduced the forest to rubble not so long ago.
                </>,
                <>It's cute.</>,
                <>
                    You twist slightly to signal that you're about to lean back.
                </>,
                <>
                    "Just a moment! <Pause ms={400} /> I do not wish to drop
                    you!"
                </>,
                <>It's stiff, but passable.</>,
                <>"Would it go better if I were the one held?"</>,
                <>"You know this dance better than I."</>,
                <>
                    You try to explain that Kaiisse should hold some of his own
                    weight.
                </>,
                <>Then, next round, you dip him.</>,
                <>
                    It appears he didn't get the memo, because the two of you
                    tumble to the ground, your faces millimetres away.
                </>,
                <>
                    "Ah. <Pause ms={1000} /> I see.""
                </>,
                <>"Perhaps we are better off not attempting that again?/'</>,
                <>"At least not without more practice."</>,
                <>You don't get to respond before the world goes dark yet again.</>,
                <>Once again, you appear in the clearing.</>
            ],
        },
        {
            text: "Twirl",
            animation: "idle",
            flag:"twirl",
            second: () => [
                <>
                    You twirl in Kaiisse's arm. He doesn't know where to put his
                    hands.
                </>,
                <>His bashful face is very cute.</>,
            ],
            first: (flags) => [
                <>You raise Kaiisse's arm and duck under it.</>,
                <>
                    The poor thing doesn't know what to do for a moment before
                    realizing that it's an invitation to dance.
                </>,
                <>
                    You hold his hands in yours and gesture for the
                    {flags.includes("hum") ? " " : " silent "}waltz to continue.
                </>,
                <>"Again?"</>,
                <>
                    As you twirl again, Kaiisse raises his arm a little too
                    high.
                </>,
                <>"Not quite, not quite."</>,
                <>"One more time!"</>,
                <>You twirl again.</>,
                <>Kaiisse focuses like his life depends on it.</>,
                <>This time, the two of you twirl like it's a fairytale.</>,
                <>"That was excellent!"</>,
                <>"Oh, but you must be getting dizzy."</>,
                <>"Shall I try?"</>,
                <>Seeing how eager he is, you nod.</>,
                <>Kaiisse twirls clumsily.</>,
                <>His balance seems off.</>,
                <>"This is much harder than it seems."</>,
                <>
                    "I am not used to this form. Nor is it a perfect replica of
                    your human shape."
                </>,
                <>"You must forgive me if I trip you."</>,
            ],
        },
        {
            text: "Hum",
            animation: "smile",
            flag: "hum",
            second: () => [
                <>
                    You continue to hum, and Kaiisse continues to sing along.
                </>,
            ],
            first: (flags) => [
                <>{flags.includes("twirl") ? "As you dance, ": ""}You start to hum a tune from your hometown.</>,
                <>
                    A waltz the bard plays every winter for the bored lovers in
                    the mead hall.
                </>,
                <>Suprisingly, Kaiisse joins in.</>,
                <>
                    He raises his voice to match yours. Where you can't remember
                    the notes, he fills some in. It's nothing like the songs you
                    remember. Your voice and Kaiisse's create something only you
                    two will remember.
                </>,
                <>
                    "You have a lovely voice. It much helped with this dance of
                    yours! Is it custom to sing while you dance?"
                </>,
                <>"Not always? A shame."</>,
                <>
                    "Dances from my kin are meant to be sung. But your people have musicians. From what I have heard, instruments free your breath for... <Pause ms={400}/> other things."
                </>,
                <>
                    "Teach me your song, and I shall sing it."
                </>,
            ],
        },
    ],
};
const you: LoopInstance = {
    id: "you",
    animation: "smile",
    music: "flute",
    enables: [cooking, foraging],
    options: [
        {
            text: "Past",
            animation: "smile",
            second: () => ["You don't feel up to talking about that yet."],
            first: () => [
                <>"Before this, who were you?"</>,
                <>"You do not seem like the typical champion of the gods."</>,
                <>"The child of seamstresses?"</>,
                <>Kaiisse dips a clawed foot into the stream</>,
                <>On a whim, you splash him</>,
                <>
                    "Wh-
                    <Pause ms={100} /> I mean no offense!"
                </>,
                <>
                    "Baking is a respectable profession! Everyone has to eat
                    sometime!"
                </>,
                <>
                    "Me? I have always been a fighter. I am quite a good one, if I
                    do say so myself, which is a good thing, since it's all I've
                    ever known."
                </>,
                <>
                    "My dam was one of the best fighters of us all. I was lucky
                    enough to inherit her passion and her talent."
                </>,
                <>
                    "I do not know though, perhaps you can teach me more than
                    fighting."
                </>,
                <>
                    "I wonder... <Pause ms={500} /> If I had been a craftsman's
                    child, and you the heir, would we have met like this?"
                </>,
                <>
                    "Would I have taken my people's mantle had it not been
                    thrust upon me?"
                </>,
                <>"Instead, the gods strike against me for my sire's sins."</>,
                <>
                    "No, they are mine as well at this point. I bear them
                    willingly."
                </>,
                <>
                    "How do you do it? Risking your lives for millions you will
                    never know?"
                </>,
                <>You don't get to answer before everything shatters again.</>,
                <>Which is probably a good thing; you don't know how either.</>,
            ],
        },
        {
            text: "Fish",
            animation: "laugh",
            second: () => [
                "You take another bite of your fish.",
                "It reminds you of home.",
            ],
            first: (flags) => [
                <>
                    You wade into the stream, scattering the fish around your
                    ankles.
                </>,
                <>
                    Your supernatural agility allows you to easily grasp a big
                    and juicy specimen from the water.
                </>,
                <>
                    "I suppose you plan to make a meal? I will provide you an
                    ember"
                </>,
                <>
                    Kaiisse starts a fire while you gut, salt and skewer the
                    fish.
                </>,
                <>
                    "Cooking with fire is one thing, but cooking with rocks? I
                    do not believe I've ever had this before."
                </>,
                <>
                    You split half the fish with him. He takes his half and
                    savors it delicately.
                </>,
                <>"How unlike anything I have ever had before!"</>,
                ...(flags.includes("dragons")
                    ? [
                          <>
                              "Some of the restaurants in our cities had meat
                              cooked with flame, but no one had heard of putting
                              sand or rocks on meat before."
                          </>,
                      ]
                    : []),
                <>
                    "The scent of wood and smoke elevate the flavor of the
                    flesh. No matter what the elders say."
                </>,
                <>
                    "I have no interest in culinary arts, but it appears you do.
                    Will you make more meals if I bring you more of these
                    'spices?'"
                </>,
                <>It will be done then. Just you wait!</>,
            ],
            flag: "fish",
        },
        {
            text: "Forest",
            animation: "smile",
            second: () => [],
            first: (flags) => [
                <>"You navigate well"</>,
                <>
                    "Yes, I suppose it would have been a necessary skill to
                    learn."
                </>,
                ...(flags.includes("flight")
                    ? [
                          <>
                              "I should take you up to the treetops; it's
                              beautiful up there."
                          </>,
                      ]
                    : []),
                <>"Did you spend much of your time about the trees?"</>,
                <>"In them? Truly? Like some sort of monkey?"</>,
                ...(flags.includes("fish")
                    ? [<>You step out of the stream.</>]
                    : [<> You look towards the closest tree.</>]),
                <>Reaching for the nearest branch, you hoist your way up.</>,
                <>
                    Grinning at Kaiisse, you flick some of the dirt on your feet
                    at him.
                </>,
                <>He dodges with a yelp.</>,
                ...(flags.includes("sandals")
                    ? [<>You truly are a trickster!</>]
                    : []),
                <>"Mercy, mercy! I yield!"</>,
                <>
                    "A true child of the wilderness. I can see how the
                    woods would call to you."</>,
                
            ],
        },
    ],
};

const gods: LoopInstance = {
    id: "gods",
    animation: "idle",
    music: "plucky",
    enables: [forging, spar],
    options: [
        {
            text: "Sandals",
            animation: "laugh",
            second: () => [
                <>
                    You gesture towards your sandals, your most prized relic,
                    but Kaiisse seems more interested in the other parts of your
                    kit.
                </>,
            ],
            first: () => [
                <>
                    "Your sandals are divine in nature? <Pause ms={700} /> A
                    gift from a trickster? Ha! You must tell me how you got
                    these!"
                </>,
                <>
                    You relate to Kaiisse the provenance of the sandals, an
                    amusing anecdote involving a hot sprint, two warring groups
                    of bandits, and a goat.
                </>,
                <>
                    Some parts are hard to mime out, but Kaiisse seems to
                    appreciate you acting like a goat.
                </>,
                <>"Yes, that is the sort of thing trickers tend to do."</>,
                <>
                    "The old tales say the first trickers were born from the
                    winds."
                </>,
                <>
                    "Eventually, like us, they made war on each other until
                    eventually they were all conquered by the four great winds
                    we know today."
                </>,
                <>
                    "But before that, there were so many of them out in the
                    world."
                </>,
                <>"Sea winds, forest winds, mountain winds."</>,
                <>
                    "They were our friends; we helped each other out in the sky.
                    Yet they played tricks on us as well."
                </>,
                <>
                    "Sometimes you remind me of those mischevous sprites,
                    giggling as they play their tricks on me."
                </>,
                <>"Honestly, I would not mind if you were!"</>,
                <>Kaiisse's laughter rings out like a bell.</>,
                <>
                    It echos and amplifies off edges of reality into a cacaphony
                    as the world shatters like glass once again.
                </>,
                <>
                    When it's over, you're back in the clearing with the same
                    dias and same figure.
                </>,
                <>He gestures to you to come over.</>,
            ],
            flag:"sandals",
        },
        {
            text: "Bow",
            animation: "smile",
            second: () => [
                <>
                    Kaiisse's eyes roam across your body before settling around
                    your chest
                </>,
                <>"It really is a very nice bow."</>,
            ],
            first: () => [
                <>"I find myself curious. Your bow is made of Godsblood?"</>,
                <>...</>,
                <>"Ah, resin, not pure blood."</>,
                <>
                    "Sanctified, I assume, to pierce through my scales so
                    easily."
                </>,
                <>
                    "It really is facinating! I've never seen blood-resin up
                    close."
                </>,
                <>
                    "Unfortunately any weapon I wield has a tendency to shatter
                    into little pieces"
                </>,
                <>
                    "I wonder if Dragonblood is similar enough to Godsblood to
                    form a blade that I could wield?"
                </>,
                <>
                    You shrug. <Pause ms={400} /> You're not a smith, but you
                    know the recipe. It isn't that hard to make the resin, but
                    Kaiisse will have to do the enchantments.
                </>,
                <>
                    "Ha! We will have to try it one of these loops.{" "}
                    <Pause ms={400} />
                    It will be a worthy task."
                </>,
                <>His smile is brilliant, so bright that it blinds you.</>,
                <>
                    When you open your eyes again, you're back in the clearing.
                </>,
                <>Kaiisse smiles at you and beckons. It's a good smile.</>,
            ],
            flag: "bow",
        },
        {
            text: "Cloak",
            animation: "idle",
            second: () => [
                <>You wrap your cloak around Kaiisse.</>,
                <>The silence is deafening, but you don't mind.</>,
            ],
            first: (flags) => [
                ...(flags.includes("bow")
                    ? [
                          <>"Is your cloak godsblood as well?"</>,
                          <>"No, merely enchanted? By whom?"</>,
                      ]
                    : [<>"Where is your cloak from?"</>]),
                <>"A gift from your grandmother?"</>,
                <>"Her talent must be vast, this is fine work."</>,
                <>"I remember one of my sisters had an eye for enchanting."</>,
                <>"She is no longer with us."</>,
                <>"But yet, I find myself thinking of her often."</>,
                <>"She would have loved to meet your grandmother."</>,
                <>You pat Kaiisse.</>,
                <>Your grandmother is gone as well</>,
                <>"My condolences."</>,
                <>"Let us hope then, that wherever they are, that they may spin thread together in peace."</>
            ],
        },
    ],
};
const drakes: LoopInstance = {
    id: "drakes",
    animation: "smile",
    music: "strings",
    enables: [dance, flight],
    options: [
        {
            text: "Dragons",
            animation: "sad",
            second: () => [
                <>Kaiisse smiles a sad smile at you.</>,
                <>"Oh, so forward already?"</>,
                <>He doesn't look ready to broach this subject yet.</>,
            ],
            first: (flags) => [
                <>Kaiisse shakes his head sadly.</>,
                <>"There are so few of us."</>,
                ...(!flags.includes("drakes")
                    ? [
                          <>
                              You gesture to the drakes flying above, an
                              implicit question in the air.
                          </>,
                          <>"No, those are only drakes, not true dragons."</>,
                      ]
                    : []),
                <>"There must only be fifty of us left."</>,
                <>"A pitiful amount compared to your millions."</>,
                <>"But our numbers were not always this low."</>,
                <>Kaiisse looks upwards.</>,
                <>With a faraway look in his eyes, he sighs.</>,
                <>
                    "We built cities in the sky, carved of clouds and mountain
                    peaks.""
                </>,
                <>
                    "I remember festivals. Our artists sculpted beauties out of
                    snow and ice. Our musicians songs could be heard from one
                    end of the continent to the other."
                </>,
                <>
                    "And then we dwindled, and our culture was slowly but surely
                    lost to the rain of time."
                </>,
                <>"I had seven older siblings."</>,
                <>
                    "When our scouts first arrived in your land, there were only three of us left."
                </>,
                <>His sentence trails off into silence. When you look at him again, you see him fracture like a broken mirror before reality collapses and everything fades into darkness.</>,
                <>Once again, you're back in the clearing.</>,
                <>Kaiisse gestures for you to come closer like the two of you weren't trying to kill each other not so long ago.</>
            ],
        },
        {
            text: "Drakes",
            animation: "idle",
            second: () => [
                <>"What, haven't heard enough about my cousins?"</>,
                <>
                    "Curious about my my family? I didn't know we were at that stage yet."
                </>,
            ],
            first: (_, loops) => [
                ...(loops.length > 7 ? ["Ah, finally curious."] : []),
                <>"They are not true dragons."</>,
                <>
                    "You understand the property of godsblood, correct?{" "}
                    <Pause ms={400} /> You must, with that bow."
                </>,
                <>"Dragonsblood is the same."</>,
                <>There's a smear of blood on Kaiisse's palm.</>,
                <>It's wine-dark, nearly black in the darkening light.</>,
                <>"A talented few of us practice sorcery."</>,
                <>
                    "Our blood, given <em>anima</em>, creates drakes."
                </>,
                <>
                    "Much like apes are to you, they mimic our shape, but lack
                    our spark."
                </>,
                <>
                    "I admit... <Pause ms={400} /> I am not fond of them"
                </>,
                <>
                    He raises his head and gazes at the small figures overhead.
                </>,
                <>"But I imagine that you are not fond of apes either."</>,
                <>
                    "Though I admit I don not think your kind have bred apes for
                    war <Pause ms={2000} /> yet."
                </>,
            ],
            flag: "drakes",
        },
        {
            text: "War",
            animation: "sad",
            second: () => [
                <>
                    You don't want to ruin the moment by asking about this
                    again.
                </>,
            ],
            first: (flags) => [
                <>Kaiisse sighs.</>,
                <>
                    "You must understand, we have never been the favored
                    children."
                </>,
                <>"The gods cast us aside when creating this realm."</>,
                <>
                    "Because of this, my proud sire could not abide watching his
                    kin die."
                </>,
                <>"He raised his flag in rebellion against the gods."</>,
                ...(flags.includes("drakes")
                    ? [`"He made the first drakes then, to serve as his army"`]
                    : []),
                `"He set out to slay your gods ${
                    flags.includes("drakes")
                        ? "and used his own flesh and blood to do so"
                        : "by any means necessary"
                }."`,
                <>
                    "His actions, while noble, spawned a cycle of violence that
                    persists to today."
                </>,
                <>You run your finger along your bow.</>,
                <>Kaiisse seems to sense your melancholy.</>,
                <>He rests an armored hand over yours.</>,
                <>"I do not begrudge your actions."</>,
                <>"You fought well!"</>,
                <>
                    "In another world<Pace ms={100}>...</Pace> we might have
                    been friends.
                </>,
            ],
        },
    ],
};


const thirdLoop: LoopInstance = {
    id: "third",
    animation: "idle",
    music: "quiet",
    options: [
        {
            text: "Surrender",
            second: () => [
                <>Now why would you do that?</>,
                "Draw your bow young hero, and fight on!",
            ],
            first: () => [
                <>You lay down your bow and kneel on the ground.</>,
                <>
                    You tilt your face up and offer your empty, upturned palms.
                </>,
                <>
                    Your gazes are drawn to each other like a string being
                    pulled taut.
                </>,
                <>"What? A truce?"</>,
                <>
                    "Yes, that is, <Pause ms={1000} /> acceptable.
                </>,
                <>The dragon transforms back into his human form.</>,
                <>
                    It's the first time you've seen him up close.{" "}
                    <Pause ms={300} /> Face to face, His brilliant red eyes bore
                    into you with the same intensity of dragon form.{" "}
                    <Pause ms={300} /> He's taller than you.
                </>,

                <>
                    Honestly, despite being your mortal enemy, he's suprisingly
                    <Pace ms={100}>...</Pace>
                    <Pause ms={400} /> beautiful.{" "}
                </>,
                <>"Was it worth it?"</>,
                <>"Winning I mean."</>,
                <>"Did your blood rise to the challenge?"</>,
                <>
                    "Hah… <Pause ms={300} /> even so, I doubt this is what the
                    gods intend.""
                </>,
                <>...</>,
                <>"My name?"</>,
                <>
                    "All these deaths, and you never learned my name?{" "}
                    <Pause ms={300} /> Ha!
                </>,
                <>
                    Call me <em>Kaiisse</em>"
                </>,
                <>...</>,
                <>"No, I know your name"</>,
                <>
                    "I've known your name from the first time you killed one of
                    my men."
                </>,
                <>"Until then, we hadn't known stalemate, let alone defeat."</>,
                <>"Of course I learned your name!"</>,
                <>
                    The great dragon - <em>Kaiisse</em> - goes to say more, but
                    instead freezes.
                </>,
                <>
                    The world shatters around you and you're plunged into
                    darkness
                </>,
                <>
                    When you open your eyes again, you're back in the clearing.

                </>,
                <>You and Kaiisse lock eyes. Yet he doesn't transform and you don't nock your bow.</>,
                <>You lower your weapon, and he relaxes. You approach slowly, and he gestures for you to sit next to him.</>
            ],
            animation: "idle",
        },
        {
            text: "Fight",
            first: () => [
                <>You nock your bow and prepare for combat.</>,
                <>The two of you are perfectly matched in your dance.</>,
                <>Neither of you manage to strike a decisive blow.</>,
            ],
            second: () => [
                <>You nock your bow and prepare for combat.</>,
                <>The two of you are perfectly matched in your dance.</>,
                <>Neither of you manage to strike a decisive blow.</>,
            ],
            animation: "dragon",
        },
        {
            text: "Talk",
            second: () => [<>There is no time for words, hero.</>],
            first: () => [<>There is no time for words, hero.</>],
            animation: "dragon",
        },
    ],
    enables: [drakes, gods, you],
};


export const secondLoop: LoopInstance = {
    id: "second",
    animation: "dragon",
    music: "breakdown",
    options: [
        {
            text: "Fight",
            first: () => [
                <>You nock your bow and prepare for combat.</>,
                <>You know every move he's going to make before he does <Pause ms={1000}/> and he knows every move you're going to make before you even decide to make it.</>,
                <>The two of you dance blood-stained waltz to a tune only you can hear.</>,
                <>"You have become more vicious!"</>,
                <>"Good, <Pause ms={200}/> Good</>,
                <>Eventually, however, one of you stumbles.</>,
                <>The terrifying dragon tumbles out of the sky, wing membranes pockmarked with arrow wounds</>,
                <>As he falls, he looks you in the eye.</>,
                <>And he laughs.</>,
            ],
            second: () => ["You get the feeling that you should talk first."],
            animation: "dragon",
        },
        {
            text: "Talk",
            second: () => [<>There is no time for words, hero.</>],
            first: () => [<>"There is no time for words, hero."</>],
            animation: "dragon",
        },
    ],
    enables: [thirdLoop],
};

export const startingDialogue: DialogueChain = {
    text: "never",
    first: () => [
        "The last of the drakes fall to your bow.",
        "On the dais stands a solitary figure, awaiting your arrival.",
        "He looks like he's been waiting for you.",
        '"Excellent! At Last!"',
        '"Take your stand, champion of the gods!"',
        '"This all ends now!"',
    ],
    second: () => ["you shouldn't be able to see this, sorry!"],
    animation: "smile"
};

export const startingLoop: LoopInstance = {
    id: "starting",
    animation: "idle",
    music: "fight",
    options: [
        {
            text: "Attack",
            first: () => [
                <>You draw your bow and swiftly release a shot.</>,
                <>
                    <Effect fn={() => playSFX("hurt")} />
                    Your blessed arrow pierces hide and you're rewarded with a
                    gush of blood.
                </>,
                <>
                    <Effect fn={() => playSFX("hurt")} />
                    You dodge a swipe of the great dragon's{" "}
                    <Effect fn={() => playSFX("hurt")} /> claw and continue
                    firing.
                    <Effect fn={() => playSFX("hurt")} />
                </>,
                <>
                    <Effect fn={() => playSFX("hurt")} />
                    You're so focused on the claws however, that a blast of
                    magical fire hits you head on.
                </>,
                <>
                    The flames tear through your cape and you hit{" "}
                    <Pause ms={300} /> the <Pause ms={300} /> ground.{" "}
                    <Pause ms={700} /> hard.
                </>,
                <>
                    Undeterred, you pick yourself up and launch yourself up with
                    the aid of your enchanted sandals, determined to face your
                    enemy head on
                </>,
                <>
                    The resultant exhanges last for an eternity, tearing up your
                    environment until the dais and forest are unrecognizible
                    rubble
                </>,
                <>
                    Eventually, you do it.
                    <Effect fn={() => playSFX("hurt")} /> <Pause ms={700} /> One
                    of your arrows pierces the dragon's heart.
                </>,
                <>
                    With a final roar, the great dragon collapses onto the
                    charred forest floor.
                </>,
                <>
                    A large ruby eye fixes on you, an inscrutable emotion
                    swirling behind it.
                </>,
                <>It's over.</>,
                <>You slump down, trying and failing to catch your breath.</>,
                <>You draw your hand away from your middle, finding it <span style={{color:"red"}}>red with blood.</span></>,
                [<Pause ms={350}/>, "You close your eyes...", <Pause ms={400}/>, <Pace ms={100}>just for a moment.</Pace>],
                <>You open your eyes to a familiar clearing.</>,
                <>The trees, the platform<Pace ms={300}>...</Pace> <Pause ms={1000}/> It's as if your battle had never happened.</>,
                <>"I see you and I have yet more to accomplish."</>,
                <>"Again, then!"</>,
            ],
            second: () => ["how did you see this?"],
            animation: "dragon",
        },
    ],
    // First loop is special; it will always go to the second loop based on initial state in app.tsx
    enables: [],
}; 