define(function() {
  return "<div class='snapshot-list'> <div class='snapshot-create'><span class='icon-loading'></span><p>Creating Snapshot...</p></div> {{^snapshots}} <div class='snapshot-empty'> <p>Ready to share this Workspace? <span>Take your first Snapshot now.</span></p> </div> {{/snapshots}} {{#snapshots}} {{> snapshot}} {{/snapshots}} </div>"
});
