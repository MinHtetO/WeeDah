# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :weedah,
  ecto_repos: [Weedah.Repo]

# Configures the endpoint
config :weedah, WeedahWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "GITZcH+7H4yvu5yV1kIk+sKcTMkB11MU3fWCK3OoKVR/IRu6pV6A32VqvrNci0fw",
  render_errors: [view: WeedahWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Weedah.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
