# NestJS Fastify Cluster Best Practice

## Benchmark

### Install Tool

```sh
curl -OL https://github.com/codesenberg/bombardier/releases/download/v1.2.6/bombardier-darwin-arm64
chmod +x ./bombardier-darwin-arm64
sudo mv ./bombardier-darwin-arm64 /usr/local/bin/bombardier
# Terminal Restart
```

```sh
bombardier -c 125 -n 10000000 http://localhost:3000
```

> **Note**  
> https://github.com/codesenberg/bombardier  
> bombardier is a HTTP(S) benchmarking tool. It is written in Go programming language and uses excellent fasthttp instead of Go's default http library, because of its lightning fast performance.

### Test Result

동접 125명이 1천만 요청을 성공적으로 끝내기까지 얼마나 걸리는가?

```sh
bombardier -c 125 -n 10000000 http://localhost:3000
```

> **Note**  
> Spec: 10Core CPU(Apple M1 Pro), 32GB RAM

#### NestJS Express No Clustering

```
총 12분 22초 소요
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
총 2분 44초 소요
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
총 3분 5초 소요
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
총 1분 22초 소요
Statistics        Avg      Stdev        Max
  Reqs/sec    121281.09   16563.88  139827.93
  Latency        1.03ms     2.97ms   182.40ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    27.65MB/s
```
