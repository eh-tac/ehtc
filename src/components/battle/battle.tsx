import {
  Component,
  h,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter
} from "@stencil/core";
import { JSX } from "../../components";
import { Battle, Review, Bug, Score } from "../../model/battle";
import { SegmentChangeEventDetail } from "@ionic/core";
import { PilotSummary } from "../../model/pilot";

@Component({
  tag: "ehtc-battle",
  styleUrl: "battle.scss",
  shadow: true
})
export class BattleComponent {
  @Prop({ mutable: true }) battle: Battle;
  @Prop() code: string;

  @State() tab: string = "info";

  @Event() downloadBattle: EventEmitter<Battle>;

  public componentWillLoad(): void {
    // TODO if battle not set, load from code
  }

  @Listen("ionChange")
  public tabSelect(e: CustomEvent<SegmentChangeEventDetail>): void {
    this.tab = e.detail.value;
  }

  private download(): void {
    this.downloadBattle.emit(this.battle);
  }

  public render(): JSX.IntrinsicElements {
    return (
      <div class={this.tab}>
        <ion-segment color="light" value={this.tab}>
          <ion-segment-button value="info">
            <ion-label>Information</ion-label>
          </ion-segment-button>
          <ion-segment-button value="reviews">
            <ion-label>Reviews</ion-label>
          </ion-segment-button>
          <ion-segment-button value="bugs">
            <ion-label>Bug Reports</ion-label>
          </ion-segment-button>
          <ion-segment-button value="scores">
            <ion-label>High Scores</ion-label>
          </ion-segment-button>
          <ion-segment-button value="stats">
            <ion-label>Statistics</ion-label>
          </ion-segment-button>
        </ion-segment>
        {this.renderInfo()}
        {this.renderReviews()}
        {this.renderBugs()}
        {this.renderScores()}
      </div>
    );
  }

  private renderInfo(): JSX.IntrinsicElements {
    const fields: { [key: string]: string | number } = {
      Missions: this.battle.missions,
      "Date added": this.battle.added,
      "Date updated": this.battle.updated
    };

    return (
      <ion-list class="info">
        <ion-list-header>
          <ion-label class="item">Details</ion-label>
        </ion-list-header>
        {Object.entries(fields).map((value: [string, string]) =>
          this.renderItem(value[0], value[1])
        )}
        <ion-list-header>
          <ion-label class="item">Creators</ion-label>
        </ion-list-header>
        {this.battle.creators.map((value: PilotSummary) =>
          this.renderItem(value.PIN, value.label)
        )}
        <ion-list-header>
          <ion-label class="item">Patches</ion-label>
        </ion-list-header>
        {this.battle.patches.map((value: string) => this.renderItem("", value))}
        <ion-item>
          <ion-button
            expand="full"
            color="secondary"
            class="download"
            onClick={this.download.bind(this)}
          >
            Download
          </ion-button>
        </ion-item>
      </ion-list>
    );
  }

  private renderReviews(): JSX.IntrinsicElements {
    return (
      <ion-list class="reviews">
        {this.battle.reviews.map((review: Review) => (
          <ion-item>
            <ion-note class="code" slot="start" color="secondary">
              {review.date}
            </ion-note>
            <ion-label>
              <h3>{review.pilot.label}</h3>
              <p class="review">{review.review}</p>
            </ion-label>
            <ion-badge slot="end" color="secondary">
              {review.rating}
              <ion-icon name="star"></ion-icon>
            </ion-badge>
          </ion-item>
        ))}
      </ion-list>
    );
  }

  private renderBugs(): JSX.IntrinsicElements {
    return (
      <ion-list class="bugs">
        {this.battle.bugs.map((review: Bug) => (
          <ion-item>
            <ion-note class="code" slot="start" color="secondary">
              {review.date}
            </ion-note>
            <ion-label>
              <h3>{review.pilot.label}</h3>
              <p class="review">{review.report}</p>
            </ion-label>
          </ion-item>
        ))}
      </ion-list>
    );
  }

  private renderScores(): JSX.IntrinsicElements {
    return (
      <ion-list class="scores">
        {this.battle.highScores.map((score: Score, idx: number) => (
          <ion-item>
            <ion-note class="code" slot="start" color="secondary">
              {idx ? `Mission ${idx}` : "Battle"}
            </ion-note>
            <ion-label>
              <h3>{score.pilot.label}</h3>
              <p>{score.date}</p>
            </ion-label>
            <ion-badge slot="end" color="secondary">
              {score.score}
            </ion-badge>
          </ion-item>
        ))}
      </ion-list>
    );
  }

  private renderItem(
    key: string | number,
    value: string | number,
    className?: string
  ): JSX.IntrinsicElements {
    return (
      <ion-item class={className}>
        <ion-note slot="start" color="light" class="ion-padding-end">
          {key}
        </ion-note>
        <ion-label class="ion-text-right">{value}</ion-label>
      </ion-item>
    );
  }
}
