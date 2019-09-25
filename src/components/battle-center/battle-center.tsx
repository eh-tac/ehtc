import "@ionic/core";

import { Component, h, State } from "@stencil/core";
import { JSX } from "../../components";
import { Config } from "../../config";
import { BattleType } from "../../model/battle-type";
import { BattleSummary, Battle } from "../../model/battle";

@Component({
  tag: "ehtc-battle-center",
  styleUrl: "battle-center.scss",
  shadow: true
})
export class BattleCenterComponent {
  @State() public page: string;
  @State() public platform: string;
  @State() public typeData: BattleType[];
  @State() public type: BattleType;
  @State() public listData: BattleSummary[];
  @State() public battle: BattleSummary;

  private fullBattle: Battle;

  private get typeUrl(): string {
    return `${Config.ROOT}/api/battle-types/${this.platform}`;
  }

  private get listUrl(): string {
    return `${Config.ROOT}${this.type.URL}`;
  }

  private get battleUrl(): string {
    return `${Config.ROOT}${this.battle.URL}`;
  }

  public render(): JSX.IntrinsicElements {
    let title: string = "";
    let content: JSX.IntrinsicElements;
    let icon = "arrow-back";
    if (this.page === "battle") {
      title = this.battle.name;
      content = this.renderBattle();
    } else if (this.page === "battle-list") {
      title = `${this.type.platform} - ${this.type.subgroup}`;
      content = this.renderList();
    } else if (this.page === "battle-types" && this.platform) {
      title = this.typeData && this.typeData.length ? this.typeData[0].platform : this.platform;
      content = this.renderTypes();
    } else {
      title = "Game platforms";
      content = this.renderPlatforms();
      icon = "";
    }

    return (
      <ion-card>
        <ion-card-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-icon slot="icon-only" name={icon} onClick={this.navigateBack.bind(this)}></ion-icon>
            </ion-buttons>
            <ion-title>{title}</ion-title>
          </ion-toolbar>
        </ion-card-header>
        <ion-card-content>{content}</ion-card-content>
      </ion-card>
    );
  }

  private navigateBack(): void {
    if (this.page === "battle-types") {
      this.page = "platforms";
    } else if (this.page === "battle-list") {
      this.page = "battle-types";
    } else if (this.page === "battle") {
      this.page = "battle-list";
    }
  }

  private renderPlatforms(): JSX.IntrinsicElements {
    return (
      <ion-grid class="platforms">
        <ion-row>
          <ion-col>
            <ion-button size="large" expand="block" onClick={this.selectPlatform.bind(this, "XW")}>
              X-Wing
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" expand="block" onClick={this.selectPlatform.bind(this, "TIE")}>
              TIE Fighter
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="twin">
            <ion-button class="half" size="large" onClick={this.selectPlatform.bind(this, "XvT")}>
              XvT
            </ion-button>
            <ion-button class="half" size="large" onClick={this.selectPlatform.bind(this, "BoP")}>
              BoP
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" expand="block" onClick={this.selectPlatform.bind(this, "XWA")}>
              X-Wing Alliance
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    );
  }

  private selectPlatform(platform: string, event: MouseEvent): void {
    this.platform = platform;
    const button = event.target as HTMLIonButtonElement;
    button.innerHTML = "<ion-spinner name='dots' />";
    fetch(this.typeUrl)
      .then((res) => res.json())
      .then((data) => {
        this.typeData = data;
        this.page = "battle-types";
      });
  }

  private renderTypes(): JSX.IntrinsicElements {
    return (
      <ion-list class="types">
        {this.typeData.map((type: BattleType) => (
          <ion-item key={type.code} onClick={this.selectType.bind(this, type)}>
            <ion-note class="code" slot="start" color="secondary">
              {type.code}
            </ion-note>
            <ion-label>
              {type.platform} - {type.subgroup}
            </ion-label>
            <ion-badge slot="end" color="secondary">
              {type.count}
            </ion-badge>
          </ion-item>
        ))}
      </ion-list>
    );
  }

  private selectType(type: BattleType, event: MouseEvent): void {
    this.type = type;
    const item = event.target as HTMLIonItemElement;
    item.innerHTML = "<ion-spinner name='dots' />";

    fetch(this.listUrl)
      .then((res) => res.json())
      .then((data) => {
        this.listData = data;
        this.page = "battle-list";
      });
  }

  private renderList(): JSX.IntrinsicElements {
    return (
      <ion-list class="list">
        {this.listData.map((battle: BattleSummary) => (
          <ion-item key={battle.code} onClick={this.selectBattle.bind(this, battle)}>
            <ion-note class="code" slot="start" color="secondary">
              {battle.code}
            </ion-note>
            <ion-label>
              <h3>{battle.name}</h3>
              <p>{battle.missions} missions</p>
            </ion-label>
            <ion-badge slot="end" color="secondary">
              {battle.ratingAvg}
              <ion-icon name="star"></ion-icon>
            </ion-badge>
          </ion-item>
        ))}
      </ion-list>
    );
  }

  private selectBattle(battle: BattleSummary, event: MouseEvent): void {
    this.battle = battle;
    const item = event.target as HTMLIonItemElement;
    item.innerHTML = "<ion-spinner name='dots' />";

    fetch(this.battleUrl)
      .then((res) => res.json())
      .then((data) => {
        this.fullBattle = data;
        this.page = "battle";
      });
  }

  private renderBattle(): JSX.IntrinsicElements {
    return <ehtc-battle battle={this.fullBattle} />;
  }
}
