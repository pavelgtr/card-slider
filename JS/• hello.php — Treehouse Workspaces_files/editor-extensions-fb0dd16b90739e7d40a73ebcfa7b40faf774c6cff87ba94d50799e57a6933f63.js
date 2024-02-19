(function() {
  require(["/assets/workspaces/extensions/snapshot_workspace/html/snapshot_action.html-0b2b58c42863c62f258315dd3d3420235d416a0e1eaa55f06c7f0ee7a0b9d55b.js", "/assets/workspaces/extensions/fork_workspace/html/fork_action.html-3b3ed5d753be99dd5cd6d92859faa9ccd878cea54f3f8923e839b572105fcf0a.js"], function(snapshotActionTemplate, forkActionTemplate) {
    var AppInit, Workspace, addUtilAction;
    AppInit = require("utils/AppInit");
    Workspace = require("workspace-editor/workspace/Workspace");
    addUtilAction = function(template) {
      return $('ul.util-actions').prepend(template);
    };
    return AppInit.htmlReady(function() {
      addUtilAction(forkActionTemplate);
      return addUtilAction(snapshotActionTemplate);
    });
  });

}).call(this);
(function() {
  require(["/assets/workspaces/extensions/snapshot_workspace/html/partials/snapshots.html-4cb9072f7170942366c7d3f9ae83b059c38937d882f15c945b956092a5f0be11.js", "/assets/workspaces/extensions/snapshot_workspace/html/partials/snapshot.html-164e69f0094c2a9c232458f0aef96e4da493f942f124658b7fb445d4364f14f6.js"], function(snapshotsPartial, snapshotPartial) {
    var AppInit, ExtensionUtils, MAX_SNAPSHOTS_PER_WORKSPACE, Workspace, createSnapshot, deleteSnapshot, displayCreateStatus, displayDeleteConfirmation, displayDeleteStatus, hideDeleteConfirmation, hideSnapshotManger, itemForTarget, listSnapshots, manager, partials, preventClose, registerSnapshotEventHandlers, renderSnapshots, setupSnapshotManager, snapshotCount, tab, toggleCreateSnapshotButton, toggleSnapshotManager, updateSnapshotCount, workspaceId;
    AppInit = require("utils/AppInit");
    ExtensionUtils = require("utils/ExtensionUtils");
    Workspace = require("workspace-editor/workspace/Workspace");
    MAX_SNAPSHOTS_PER_WORKSPACE = 5;
    ExtensionUtils.addLinkedStyleSheet("/assets/workspaces/extensions/snapshot_workspace/snapshot_workspace-829e4bde4b6b4fa1dafa39a09020797d1807bd74679a88d2b53bab276e6e5222.css");
    tab = null;
    manager = null;
    workspaceId = null;
    snapshotCount = 0;
    partials = {
      snapshots: snapshotsPartial,
      snapshot: snapshotPartial
    };
    setupSnapshotManager = function() {
      tab = $('#snapshot-tab');
      manager = $('.snapshot-manager');
      tab.on('click', toggleSnapshotManager);
      manager.on('click', preventClose);
      $('body').on('click', hideSnapshotManger);
      return $('#create-snapshot').on('click', createSnapshot);
    };
    registerSnapshotEventHandlers = function() {
      manager.find('.snapshot-item-delete').on('click', displayDeleteConfirmation);
      manager.find('.snapshot-delete-cancel').on('click', hideDeleteConfirmation);
      return manager.find('.snapshot-delete-confirm').on('click', deleteSnapshot);
    };
    preventClose = function(e) {
      return e.stopPropagation();
    };
    toggleSnapshotManager = function(e) {
      manager.closest('.util-dropdown').toggleClass('open');
      return false;
    };
    hideSnapshotManger = function(e) {
      return manager.closest('.util-dropdown').removeClass('open');
    };
    createSnapshot = function() {
      var url;
      url = "/workspaces/" + workspaceId + "/snapshots";
      displayCreateStatus();
      return $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        success: listSnapshots,
        error: function(resp) {
          return alert("There was a problem creating a snapshot for this workspace.");
        }
      });
    };
    listSnapshots = function() {
      var url;
      url = "/workspaces/" + workspaceId + "/snapshots";
      return $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        success: function(data, status, xhr) {
          return renderSnapshots(data);
        }
      });
    };
    deleteSnapshot = function(e) {
      var snapshotId, url;
      snapshotId = $(e.target).data('snapshot-id');
      url = "/workspaces/" + workspaceId + "/snapshots/" + snapshotId;
      displayDeleteStatus(itemForTarget(e.target));
      return $.ajax({
        url: url,
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        success: listSnapshots
      });
    };
    displayDeleteConfirmation = function(e) {
      var $parent;
      hideDeleteConfirmation();
      $parent = $(e.target).parents('.snapshot-item');
      $parent.find('.snapshot-delete').show();
      return e != null ? e.preventDefault() : void 0;
    };
    hideDeleteConfirmation = function(e) {
      $('.snapshot-delete').hide();
      return e != null ? e.preventDefault() : void 0;
    };
    displayCreateStatus = function() {
      return $('.snapshot-create').show();
    };
    displayDeleteStatus = function(item) {
      return item.find('.snapshot-delete-active').show();
    };
    itemForTarget = function(target) {
      return $(target).closest('.snapshot-item');
    };
    renderSnapshots = function(data) {
      var html, snapshots;
      snapshots = {
        snapshots: data
      };
      snapshotCount = data.length;
      updateSnapshotCount();
      toggleCreateSnapshotButton();
      html = Mustache.render(snapshotsPartial, snapshots, partials);
      manager.find('.snapshot-list').replaceWith(html);
      return registerSnapshotEventHandlers();
    };
    updateSnapshotCount = function() {
      return manager.find('.snapshot-count').html(snapshotCount + " of " + MAX_SNAPSHOTS_PER_WORKSPACE + " Snapshots taken");
    };
    toggleCreateSnapshotButton = function() {
      var button;
      button = manager.find('#create-snapshot');
      if (snapshotCount >= MAX_SNAPSHOTS_PER_WORKSPACE) {
        return button.attr('disabled', 'disabled');
      } else {
        return button.removeAttr('disabled');
      }
    };
    return AppInit.appReady(function() {
      workspaceId = Workspace.getMetadata().hostedId;
      setupSnapshotManager();
      renderSnapshots([]);
      return listSnapshots();
    });
  });

}).call(this);
(function() {
  require(["/assets/workspaces/extensions/fork_workspace/html/fork_dialog.html-8966b718445aacd5161b32dc95d0a2e25ce2a42e4ae725f744aef3ad16c3db54.js"], function(forkDialogTemplate) {
    var AppInit, Dialogs, ExtensionUtils, Workspace, forkWorkspace, showForkDialog;
    AppInit = require("utils/AppInit");
    Dialogs = require("widgets/Dialogs");
    ExtensionUtils = require("utils/ExtensionUtils");
    Workspace = require("workspace-editor/workspace/Workspace");
    ExtensionUtils.addLinkedStyleSheet("/assets/workspaces/extensions/fork_workspace/fork_workspace-0bf055b216bb0c04378daef8d2a787c9ff82cac750f27c06427fa991264e1bfc.css");
    showForkDialog = function(e) {
      var dialog, dialogEl, template, titleInput;
      template = Mustache.render(forkDialogTemplate, Workspace.getMetadata());
      dialog = Dialogs.showModalDialogUsingTemplate(template);
      dialogEl = dialog.getElement();
      titleInput = dialogEl.find("#workspace-title-input");
      dialog.done(function(id) {
        var forkedWorkspaceId, ref;
        if (id === Dialogs.DIALOG_BTN_OK) {
          forkedWorkspaceId = (ref = Workspace.getMetadata().hostedId) != null ? ref : Workspace.getMetadata().id;
          return forkWorkspace(titleInput.val(), forkedWorkspaceId);
        }
      });
      return e != null ? e.preventDefault() : void 0;
    };
    forkWorkspace = function(title, workspaceId) {
      var data;
      data = {
        workspace: {
          title: title,
          forked_workspace_id: workspaceId
        }
      };
      return $.ajax({
        url: "/workspaces",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(data),
        success: function(resp) {
          return window.location = "/workspaces/" + resp.workspace.id;
        },
        error: function(resp) {
          return alert("There was a problem forking this workspace.");
        }
      });
    };
    return AppInit.htmlReady(function() {
      var csrf;
      $('#fork-tab').on('click', showForkDialog);
      csrf = $("meta[name='csrf-token']").attr("content");
      return $.ajaxSetup({
        beforeSend: function(xhr) {
          return xhr.setRequestHeader('X-CSRF-Token', csrf);
        }
      });
    });
  });

}).call(this);
(function() {
  var EditorManager, ExtensionUtils;

  EditorManager = require("editor/EditorManager");

  ExtensionUtils = require("utils/ExtensionUtils");

  ExtensionUtils.addLinkedStyleSheet("/assets/workspaces/extensions/csharp_highlighting/csharp_highlighting-1fecfcd7886a53e511301d25654367a20f1a345d707c24ac5870145e6940b4aa.css");

  $(EditorManager).on("activeEditorChange", function(event, activatedEditor, oldEditor) {
    var element;
    if ((activatedEditor != null ? activatedEditor.document.language.getId() : void 0) === "csharp") {
      element = $(activatedEditor.getRootElement());
      return element.addClass("cm-s-visualstudio").removeClass("cm-s-light");
    }
  });

}).call(this);
(function() {
  require(["/assets/workspaces/extensions/read_only_mode/html/read_only_dialog.html-8abcd3c97c8d24dd82fafcbeadf00356cb100f5c2e55ef22d7c0409b1ffd3e0d.js"], function(readOnlyDialogTemplate) {
    var CommandManager, Commands, Dialogs, ErrorHandler, NativeFileError, Workspace, showReadOnlyDialog;
    Dialogs = require("widgets/Dialogs");
    CommandManager = require("command/CommandManager");
    Commands = require("command/Commands");
    NativeFileError = require("file/NativeFileError");
    ErrorHandler = require("workspace-editor/project/ErrorHandler");
    Workspace = require("workspace-editor/workspace/Workspace");
    showReadOnlyDialog = function() {
      var dialog, dialogEl, template, titleInput;
      template = Mustache.render(readOnlyDialogTemplate, Workspace.getMetadata());
      dialog = Dialogs.showModalDialogUsingTemplate(template);
      dialogEl = dialog.getElement();
      titleInput = dialogEl.find("#workspace-title-input");
      return dialog.done(function(id) {
        if (id === Dialogs.DIALOG_BTN_OK) {
          return CommandManager.execute(Commands.FORK_WORKSPACE, titleInput.val(), Workspace.getMetadata().id);
        }
      });
    };
    return ErrorHandler.registerHandlerForError(NativeFileError.NO_MODIFICATION_ALLOWED_ERR, showReadOnlyDialog);
  });

}).call(this);
(function() {
  require(["/assets/workspaces/extensions/total_size_limit/html/size_limit_reached_dialog.html-16ad1ffe8cc3ff2c697b34d820ed3c8f6fc4039c548415723e865f67878d1d0c.js"], function(sizeLimitReachedDialogTemplate) {
    var AppInit, CommandManager, Commands, Dialogs, ErrorHandler, NativeFileError, SIZE_LIMIT, fileSizeOpts, filesize, humanSize, showSizeLimitReachedDialog;
    AppInit = require("utils/AppInit");
    Dialogs = require("widgets/Dialogs");
    CommandManager = require("command/CommandManager");
    Commands = require("command/Commands");
    NativeFileError = require("file/NativeFileError");
    ErrorHandler = require("workspace-editor/project/ErrorHandler");
    filesize = require("workspace-editor/utils/filesize.min");
    SIZE_LIMIT = 52428800;
    fileSizeOpts = {
      base: 2,
      round: 1
    };
    showSizeLimitReachedDialog = function() {
      var template;
      template = Mustache.render(sizeLimitReachedDialogTemplate, {
        sizeLimit: humanSize(SIZE_LIMIT),
        currentSize: humanSize(brackets.fs.driver.currentFSSize)
      });
      return Dialogs.showModalDialogUsingTemplate(template);
    };
    ErrorHandler.registerHandlerForError(NativeFileError.QUOTA_EXCEEDED_ERR, showSizeLimitReachedDialog);
    humanSize = function(size) {
      return filesize(size, fileSizeOpts);
    };
    return AppInit.htmlReady(function() {
      return brackets.fs.driver.setMaxFSSize(SIZE_LIMIT);
    });
  });

}).call(this);






