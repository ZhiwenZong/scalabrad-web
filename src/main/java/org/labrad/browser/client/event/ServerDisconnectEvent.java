package org.labrad.browser.client.event;

import java.io.Serializable;

import com.google.gwt.event.shared.EventHandler;
import com.google.gwt.event.shared.GwtEvent;


@SuppressWarnings("serial")
public class ServerDisconnectEvent extends GwtEvent<ServerDisconnectEvent.Handler> implements Serializable {
  private String server;

  protected ServerDisconnectEvent() {}

  public ServerDisconnectEvent(String server) {
    this.server = server;
  }

  public String getServer() { return server; }

  @Override
  public String toString() { return "server='" + server + "'"; }


  public static interface Handler extends EventHandler {
    void onServerDisconnect(ServerDisconnectEvent event);
  }

  public static Type<Handler> TYPE = new Type<Handler>();

  @Override
  public GwtEvent.Type<Handler> getAssociatedType() {
    return TYPE;
  }

  @Override
  protected void dispatch(Handler handler) {
    handler.onServerDisconnect(this);
  }
}