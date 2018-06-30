defmodule WeedahWeb.PageController do
  use WeedahWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
