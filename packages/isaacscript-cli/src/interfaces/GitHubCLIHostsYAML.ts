export interface GitHubCLIHostsYAML {
  readonly "github.com"?: {
    readonly user?: string;
    readonly oauth_token?: string;
    readonly git_protocol?: string;
  };
}
