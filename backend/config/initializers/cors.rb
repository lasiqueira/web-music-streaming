# The frontend is served from a different origin, so allow cross-origin requests
# from the origins listed in CORS_ORIGINS (comma-separated), e.g.
#   CORS_ORIGINS=https://music.example.com
# Development and test default to the local Vite dev server; production must set it.
allowed_origins =
  if Rails.env.production?
    ENV.fetch("CORS_ORIGINS") do
      raise "Set CORS_ORIGINS to the frontend origin(s) allowed to call this API, e.g. https://music.example.com"
    end
  else
    ENV.fetch("CORS_ORIGINS", "http://localhost:8080,http://127.0.0.1:8080")
  end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*allowed_origins.split(",").map(&:strip).reject(&:empty?))

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
