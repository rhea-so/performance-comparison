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

#### Golang Fiber No Prefork

```
Total: 1m19s
Statistics        Avg      Stdev        Max
  Reqs/sec    125606.07    8285.51  191751.52
  Latency        0.99ms   442.48us   148.52ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    23.61MB/s
```

#### Golang Fiber Prefork

```
Total: 1m18s
Statistics        Avg      Stdev        Max
  Reqs/sec    127427.26   21880.64  155492.23
  Latency        0.98ms    62.41us    18.27ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    23.94MB/s
```

### DB Select

```sh
# How long does it take for 125 users to successfully complete 1 million requests?
bombardier -c 125 -n 1000000 http://localhost:3000/db
```

> **Note**  
> I use mariadb:10.6.8

#### NestJS Express No Clustering

```
Total: 3m30s
Statistics        Avg      Stdev        Max
  Reqs/sec      4752.80     420.49    5497.47
  Latency       26.30ms     1.95ms   150.82ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     1.37MB/s
```

#### NestJS Express No Clustering (bun v1.0.3)

```
Total: 3m8s
Statistics        Avg      Stdev        Max
  Reqs/sec      5300.69     751.47    6923.01
  Latency       23.58ms     2.72ms   149.77ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     1.29MB/s
```

#### NestJS Express Clustering

```
Total: 1m49s
Statistics        Avg      Stdev        Max
  Reqs/sec      9118.01    1809.83   16302.35
  Latency       13.71ms     4.40ms   210.07ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     2.63MB/s
```

#### NestJS Fastify No Clustering

```
Total: 2m19s
Statistics        Avg      Stdev        Max
  Reqs/sec      7159.80     625.62    8259.67
  Latency       17.46ms     1.48ms   115.41ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     1.65MB/s
```

#### NestJS Fastify Clustering

```
Total: 1m28s
Statistics        Avg      Stdev        Max
  Reqs/sec     11278.52    1766.53   17619.30
  Latency       11.09ms     3.98ms   235.90ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     2.59MB/s
```

#### Golang Fiber No Prefork

```
Total: 50s
Statistics        Avg      Stdev        Max
  Reqs/sec     19711.58    2470.99   25203.12
  Latency        6.34ms     1.91ms    87.40ms
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     3.63MB/s
```

---

결론, Node.js의 클러스터링은 딱히 성능에 큰 이점을 가져다 주진 않는다.

https://stackoverflow.com/questions/26781371/node-js-cluster-doesnt-significantly-improve-performance

그리고 번은 게임 체인저는 아닌 것 같다. (별로 안빠르다. IO 병목 때문인가.)

고가 진짜 빠르다.
