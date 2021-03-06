
// This is a single player class, it shall hold all info
// specific to that player
class Player{
	name: string; 			// let's have a unique name please
	hand: Card[] = []; 		// and their hands, cool
	constructor(s: string){
		this.name = s;
		this.emptyHand();
	}
	addCard(c: Card){ 		// you deserve to receive a card
		this.hand.push(c);
	}
	addHiddenCard(c: Card){
		c.setHidden(true);
		this.hand.push(c);
	}
	draw(el: HTMLElement){
		this.hand.forEach((c: Card): void=>{
			c.draw(el);
		});
	}
	emptyHand(){ 			// you ain't got nothin'
		this.hand = [];
	}
	// this prints to console
	printHand(i: number){ 	// I want to know what you have in your hand
		console.log(this.name + " has: " + this.score());
		for (; i < this.hand.length; i++)
			console.log(
					this.hand[i].val() +
					" of " +
					this.hand[i].suit
					);
	}
	revealAllCards(){
		this.hand.forEach(function(c: Card){
			c.setHidden(false);
		});
	}
	score(): number{ 		// Let's tally that score for you
		var output: number = 0;
		var numAces: number = 0;
		this.hand.forEach(function(c: Card){
			if (c.hidden) output += 0;
			else if (c.val() == "Ace") numAces++;
			else output += c.valNum();
		});
		for (;numAces > 0; numAces--){
			output += (output + 11 + numAces - 1 <= 21) ? 11 : 1;
		}
		return output;
	}
	stealCard(): Card{
		var index: number = this.hand.length-1;
		var tempCard:Card = this.hand[index]
		if (index != undefined) {
		   this.hand.splice(index, 1);
		}
		return tempCard;
	}
	canSplit(): boolean {
		if (this.hand.length == 2) {
			if (this.hand[0].value < 8 || this.hand[0].value == 12) {
				if (this.hand[0].value == this.hand[1].value)
					return true;
			} else if ((this.hand[0].value >= 8 && this.hand[0].value < 12) && (this.hand[1].value >= 8 && this.hand[1].value < 12))
				return true;

		}
		return false;
	}
}

// This container shall hold all current players and will
// handle information for all of them
class PlayerContainer{
	data: Player[] = []; 	// who's playing?
	constructor(){
		this.addPlayer('Dealer');
	}
	addPlayer(s: string){ 	// challenger approaching
		this.data.push(new Player(s));
	}
	getPlayer(i: number): Player{
		return this.data[i];
	}
	firstDeal(d: Deck){
		for (var i = this.data.length - 1; i > 0; i--){
			this.data[i].addCard(d.deal());
			this.data[i].addCard(d.deal());
		}
		this.data[0].addCard(d.deal());
		this.data[0].addHiddenCard(d.deal());
	}
	printAll(){
		this.data.forEach(function(p){
			p.printHand(0);
		});
	}
}
