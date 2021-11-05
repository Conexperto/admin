import React, { useState, useCallback, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Fab, Box, Zoom, useTheme, CircularProgress } from "@mui/material";
import { Edit, Check, Delete, Close } from "@mui/icons-material";
import { createContextHooks } from "hooks";

export interface FabActionsContextInterface {
  onEdit: (callback: Function) => void;
  onSave: (callback: Function) => void;
  onCancel: (callback: Function) => void;
  onDelete: (callback: Function) => void;
  dispatch: (type: "default" | "action" | "remove") => void;
}

export const [useFabActionsContext, Provider] =
  createContextHooks<FabActionsContextInterface>();

type Props = {
  children: ReactNode;
};
export const FabActonsProvider = ({ children }: Props): JSX.Element => {
  const ref = useRef<number | null>();
  const theme = useTheme();
  const [state, setState] = useState<number | null>(0);
  const [onEditCallback, setOnEdit] = useState<Function | null>();
  const [onSaveCallback, setOnSave] = useState<Function | null>();
  const [onCancelCallback, setOnCancel] = useState<Function | null>();
  const [onDeleteCallback, setOnDelete] = useState<Function | null>();

  const dispatch = useCallback(
    (type: "default" | "action" | "remove") => {
      if (ref.current) window.clearTimeout(ref.current);

      setState(null);
      ref.current = window.setTimeout(() => {
        switch (type) {
          case "default":
            return setState(0);
          case "action":
            return setState(1);
          case "remove":
            return setState(2);
        }
      }, 150);
    },
    [setState]
  );

  useEffect(() => {
    return () => {
      setState(0);
      ref.current && window.clearTimeout(ref.current);
    };
  }, []);

  const onEdit = useCallback(
    (callback: Function) => {
      setOnEdit(() => callback);
    },
    [setOnEdit]
  );

  const onSave = useCallback(
    (callback: Function) => {
      setOnSave(() => callback);
    },
    [setOnSave]
  );

  const onCancel = useCallback(
    (callback: Function) => {
      setOnCancel(() => callback);
    },
    [setOnCancel]
  );

  const onDelete = useCallback(
    (callback: Function) => {
      setOnDelete(() => callback);
    },
    [setOnDelete]
  );

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Provider value={{ onEdit, onSave, onCancel, onDelete, dispatch }}>
      {children}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <Zoom
          in={state === 0}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${state === 0 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={style}
            aria-label="Edit"
            color="primary"
            onClick={() => (onEditCallback ? onEditCallback() : null)}
          >
            <Edit />
          </Fab>
        </Zoom>
        <Zoom
          in={state === 1}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${state === 1 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={style}
            aria-label="Save"
            color="save"
            onClick={() => (onSaveCallback ? onSaveCallback() : null)}
          >
            <Check />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%);",
              }}
            >
              <CircularProgress
                size={55}
                sx={{ display: "block", color: "white" }}
              />
            </Box>
          </Fab>
        </Zoom>
        <Zoom
          in={state === 1}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${state === 1 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={style}
            aria-label="Cancel"
            color="remove"
            onClick={() => (onCancelCallback ? onCancelCallback() : null)}
          >
            <Close />
          </Fab>
        </Zoom>
        <Zoom
          in={state === 2}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${state === 2 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={style}
            aria-label="Cancel"
            color="remove"
            onClick={() => (onDeleteCallback ? onDeleteCallback() : null)}
          >
            <Delete />
          </Fab>
        </Zoom>
      </Box>
    </Provider>
  );
};

const style = {
  mx: 1,
};
