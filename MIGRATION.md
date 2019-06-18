# Migration from

## 0.3.x to 0.4.0

* Remove calls methods `app.device.getTextSelectionEnabled` and `setTextSelectionEnabled`.
  This functionality moved to css property `user-select: none` in `zb-body`.
