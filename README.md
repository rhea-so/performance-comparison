# Performance Comparison

## Benchmark Tool

I use [bombardier](https://github.com/codesenberg/bombardier) for benchmarking the server. bombardier is a HTTP(S) benchmarking tool. It is written in Go programming language and uses excellent fasthttp instead of Go's default http library, because of its lightning fast performance.

### Installation

```sh
curl -OL https://github.com/codesenberg/bombardier/releases/download/v1.2.6/bombardier-darwin-arm64
chmod +x ./bombardier-darwin-arm64
sudo mv ./bombardier-darwin-arm64 /usr/local/bin/bombardier
# Terminal Restart
```

## Test Case

> **Note**  
> My machine spec: 10Core CPU(Apple M1 Pro), 32GB RAM

### Hello, World!

```sh
# How long does it take for 125 users to successfully complete 10 million requests?
bombardier -c 125 -n 10000000 http://localhost:3000
```

#### NestJS Express No Clustering

```
Total: 12m22s
Statistics        Avg      Stdev        Max
  Reqs/sec     13463.00     992.13   16129.21
  Latency        9.28ms     1.17ms   675.85ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     3.86MB/s
```

#### NestJS Express Clustering

```
Total: 2m44s
Statistics        Avg      Stdev        Max
  Reqs/sec     60923.12   13099.81   88987.35
  Latency        2.05ms     2.48ms   201.63ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    17.49MB/s
```

#### NestJS Fastify No Clustering

```
Total: 3m5s
Statistics        Avg      Stdev        Max
  Reqs/sec     53832.30    4756.30   62935.49
  Latency        2.32ms   445.43us   216.23ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    12.27MB/s
```

#### NestJS Fastify Clustering

```
Total: 1m22s
Statistics        Avg      Stdev        Max
  Reqs/sec    121281.09   16563.88  139827.93
  Latency        1.03ms     2.97ms   182.40ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    27.65MB/s
```
