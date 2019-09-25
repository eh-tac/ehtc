import { Component, Prop, h, Watch, State } from "@stencil/core";
import { Config } from "../../config";
import { Pilot } from "../../model/pilot";

@Component({
  tag: "ehtc-pilot",
  styleUrl: "pilot.scss",
  shadow: true
})
export class PilotComponent {
  @Prop() pin: number;
  @State() data: Pilot;

  public componentWillLoad(): void {
    this.loadPilot();
  }

  private get pilotUrl(): string {
    return `${Config.ROOT}/api/pilot/${this.pin}`;
  }

  private get rankImg(): string {
    return `${Config.ROOT}${this.data.rankImage}`;
  }

  private get fchgImg(): string {
    return `${Config.ROOT}${this.data.FCHG.image}`;
  }

  @Watch("pin")
  private loadPilot(): void {
    this.data = undefined;
    fetch(this.pilotUrl)
      .then((res) => res.json())
      .then((pilot: Pilot) => (this.data = pilot));
  }

  public render() {
    if (!this.data) {
      return (
        <div>
          <p>Loading {this.pin}...</p>
        </div>
      );
    }

    return (
      <div class="wrapper">
        <div class="left">
          <img src={this.rankImg} class="rank" />
          <span class="subtitle rank">{this.data.rank}</span>
          <img src={this.fchgImg} class="fchg" />
          <span class="subtitle fchg">
            {this.data.FCHG.label} <span class="total">({this.data.FCHG.total})</span>
          </span>
        </div>
        <div class="right">
          <div class="name">
            <h3>{this.data.name}</h3>
            <span class="pin">#{this.data.PIN}</span>
          </div>
          <p class="id">{this.data.IDLine}</p>
          <p class="id">{this.data.secondary ? this.data.secondary.IDLine : ""}</p>
        </div>
      </div>
    );
  }
}
