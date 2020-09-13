---
date: 2020-8-28
updated: 2020-9-1
title: エラー解決メモ：Port 8080 is already in use
tags:
- Intellij
- Linux
category:
- Tech
- プログラミング
---

ポートが既に使われていると怒られたが、そのポートを何が使っているかわからない時の解決方法。

<!-- more -->

# 環境

- MacOS 10.15.6
- Intellij IDEA
- Kotlin

# 症状

Intellijでアプリケーションを起動しようとすると、下記のエラーが発生して起動に失敗。

```
PortInUseException: Port 8080 is already in use
```

IntellijでSpringBootを使った開発をしているとたまに発生するエラー。プロジェクトをストップしたと思ったのに残っている...？

# 解決方法

ポート8080を使用しているプロセスをkillします。

プロセス番号を調べる（PIDがプロセス番号）
```
lsof -i :8080
```
kill
```
kill -9 プロセス番号
```

もう一度起動してみると成功しました。

# まとめ

ポートが既に使われているときは使用しているプロセスを調べてkill。
他の環境でも同様のエラーはこのように対処できると思います。

## 参考

- [利用しているポート番号からどのプロセスが利用しているか確認する](https://qiita.com/toshihirock/items/c6a09575c2d88c210483)
